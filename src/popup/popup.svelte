<script lang="ts">
  import { Badge, Button, Col, Container, Icon, Row, TabContent, TabPane } from '@sveltestrap/sveltestrap';
  import HealthpointsIcon from './components/HealthpointsIcon.svelte';import Orders from '../orders/Orders.svelte';
  import { Store, TabId, type MerchantPoints } from '../constants';
  import { saveData } from '../utils/storage';

  let merchant = Store.FAIRPRICE;
  let activeTab: TabId = TabId.HEALTHPOINTS; // Default active tab

  const data = {
    [Store.FAIRPRICE]: {logo: "img/fairprice.jpg", url: "https://www.fairprice.com.sg/", claimUrl: "https://www.fairprice.com.sg/cart", pendingPts: 0, totalPts: 100},
    [Store.SHOPEE]: {logo: "img/shopee.png", url: "https://shopee.sg/", claimUrl: "https://shopee.sg/cart/", pendingPts: 10, totalPts: 20},
    [Store.LAZADA]: {logo: "img/lazada.png", url: "https://www.lazada.sg/", claimUrl: "https://cart.lazada.sg/cart", pendingPts: 100, totalPts: 10},
    [Store.SHENGSIONG]: {logo: "img/shengsiong.png", url: "https://shengsiong.com.sg/", claimUrl: "https://shengsiong.com.sg/", pendingPts: 0, totalPts: 0},
  }

  let totalPendingPts = 0;
  let totalClaimedPts = 0;

  Object.entries(data).forEach(([, details]) => {
    totalPendingPts += details.pendingPts;
    totalClaimedPts += details.totalPts;
  })

  const sortedData = Object.entries(data).sort((a, b) => {
    return b[1].pendingPts - a[1].pendingPts || b[1].totalPts - a[1].totalPts;
  });

  function setMerchantAndNavigate(store: string) {
    merchant = store as Store;
    activeTab = TabId.HISTORY;
  }

  function setActiveTab(e: CustomEvent) {
    activeTab = e.detail;
  }

  const points:MerchantPoints = {
    [Store.FAIRPRICE]: [
      {
        orderId: '64278724',
        points: 10,
        isClaimed:false
      },
      {
        orderId: '64278723',
        points: 5,
        isClaimed:false
      },
      {
        orderId: '64278722',
        points: 5,
        isClaimed:false
      }
    ],
    [Store.LAZADA]: [{
        orderId: '1',
        points: 10,
        isClaimed:false
      }],
    [Store.SHENGSIONG]: [],
    [Store.SHOPEE]: []
  };

  const save = saveData(points,"userId123");

</script>

<div class="header">
  <img src="img/hpb365.png" alt="logo" />
  <h1 class="header-title">Healthy 365</h1>
</div>

{#key activeTab}
  <TabContent on:tab={setActiveTab}>
    <TabPane
      tabId={TabId.STORE}
      tab="Stores"
      active={activeTab === TabId.STORE}
    >
      <div style="padding: 10px 0; flex-direction: column; border-bottom: 1px solid #dbdbdb;">
        <h6 style="margin-bottom: 0;">Participated stores:</h6>
      </div>
      <Container>
        <Row cols={1}>  
        {#each Object.entries(data) as [, {url, logo}]}
          <Col>
            <div style="margin-top: 10px;">
              <a href={url} target="_blank">
                <img src={logo} alt="logo-store"/>
              </a>
            </div>
          </Col>
          {/each}
        </Row>
      </Container>
    </TabPane>
    <TabPane
      tabId={TabId.HEALTHPOINTS}
      tab="Healthpoints"
      active={activeTab === TabId.HEALTHPOINTS}
    >
      <div style="padding: 10px 0; justify-content: space-around;">
        <div style="flex-direction: column;">
          <h6>Total Claimed: </h6>
          <Badge color="dark">{totalClaimedPts} <HealthpointsIcon size={10}/></Badge>
        </div>
        <div style="flex-direction: column;">
          <h6>Total Pending: </h6>
          <Badge color="warning">{totalPendingPts} <HealthpointsIcon size={10}/></Badge>
        </div>
      </div>
      {#each sortedData as [key, {claimUrl, logo, pendingPts, totalPts}]}
        {#if pendingPts > 0 || totalPts > 0}
          <Row style="border-top: 1px solid #dbdbdb; padding: 15px 0;">
            <Col xs="4">
              <img src={logo}  alt="logo-store"/>
            </Col>
            <Col xs="4" style="align-self: center">
              <div style="flex-direction: column; align-self: center; justify-content: start;">
                <Badge style="margin-bottom: 5px" color="light">Claimed: {totalPts} <HealthpointsIcon size={10}/></Badge>
                <Badge color="light">Pending: {pendingPts} <HealthpointsIcon size={10}/></Badge>
              </div>
            </Col>
            <Col xs="4" style="align-self: center">
              {#if pendingPts > 0}
                <Button style="width: 55px; align-self: center; float: right; margin-right: 10px;" size="sm" class="position-relative" color="warning" on:click={() => setMerchantAndNavigate(key)}>
                    Claim
                    <Badge color="danger" pill positioned ariaLabel="Unread messages">{pendingPts}</Badge> 
                </Button>
              {:else}
                <Button style="width: 55px; align-self: center; float: right; margin-right: 10px;" size="sm" class="position-relative" color="dark" on:click={() => setMerchantAndNavigate(key)}>
                 View
                </Button>
              {/if}
            </Col>
          </Row>
        {/if}
      {/each}
    </TabPane>
    <TabPane
      tabId={TabId.HISTORY}
      tab="History"
      active={activeTab === TabId.HISTORY}
    >
      <Orders {merchant} />
    </TabPane>
  </TabContent>
{/key}
<style>
  div {
    display: flex;
    justify-content: left;
  }

  .header {
    padding: 10px;
    height: 50px;
  }

  .header-title {
    font-size: medium;
    align-self: center;
    margin-bottom: 0;
    margin-left: 10px;
  }
</style>
