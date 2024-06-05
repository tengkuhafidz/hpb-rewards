<script lang="ts">
  import { Badge, Button, Col, Container, Icon, Row, TabContent, TabPane } from '@sveltestrap/sveltestrap';
  import HealthpointsIcon from './components/HealthpointsIcon.svelte';import Orders from '../orders/Orders.svelte';
  import { Store, TabId, type MerchantPoints, type MerchantData } from '../constants';
  import { saveData } from '../utils/storage';

  let merchant = Store.FAIRPRICE;
  let activeTab: TabId = TabId.HEALTHPOINTS; // Default active tab

  const merchantData: MerchantData = {
    [Store.FAIRPRICE]: {logo: "img/fairprice.jpg", url: "https://www.fairprice.com.sg/", pendingPts: 0, totalPts: 0},
    [Store.SHOPEE]: {logo: "img/shopee.png", url: "https://shopee.sg/", pendingPts: 0, totalPts: 0},
    [Store.LAZADA]: {logo: "img/lazada.png", url: "https://www.lazada.sg/", pendingPts: 0, totalPts: 0},
    [Store.SHENGSIONG]: {logo: "img/shengsiong.png", url: "https://shengsiong.com.sg/", pendingPts: 0, totalPts: 0},
  }

  const orders: MerchantPoints = {
    [Store.FAIRPRICE]: [
      {
        orderId: '64278724',
        points: 10,
        isClaimed: false
      },
      {
        orderId: '64278723',
        points: 5,
        isClaimed: false
      },
      {
        orderId: '64278722',
        points: 5,
        isClaimed: false
      }
    ],
    [Store.LAZADA]: [{
        orderId: '1',
        points: 10,
        isClaimed: false
      },{
        orderId: '2',
        points: 10,
        isClaimed: true
      }],
    [Store.SHOPEE]: [{
        orderId: '1',
        points: 100,
        isClaimed: true
      }],
    [Store.SHENGSIONG]: []
  };

  let totalPendingPts = 0;
  let totalClaimedPts = 0;

  Object.entries(merchantData).forEach(([key, details]) => {
    let merchantPendingPts = 0;
    let merchantTotalPts = 0;
    orders[key as Store].forEach((order) => {
      if(order.isClaimed){
        totalPendingPts += order.points;
        merchantTotalPts += order.points;
      } else {
        totalClaimedPts += order.points;
        merchantPendingPts += order.points;
      }
      details.pendingPts = merchantPendingPts;
      details.totalPts = merchantTotalPts;
    })
    
  });
  
  const sortedData = Object.entries(merchantData).sort((a, b) => {
    return b[1].pendingPts - a[1].pendingPts || b[1].totalPts - a[1].totalPts;
  });

  function setMerchantAndNavigate(store: string) {
    merchant = store as Store;
    activeTab = TabId.HISTORY;
  }

  function setActiveTab(e: CustomEvent) {
    activeTab = e.detail;
  };

  const save = saveData(orders,"userId123");

</script>

<div style="padding: 10px; height: 50px;">
  <img src="img/hpb365.png" alt="logo" />
  <h1 style="font-size: medium; align-self: center; margin-bottom: 0; margin-left: 10px;">Healthy 365</h1>
</div>

{#key activeTab}
  <TabContent on:tab={setActiveTab} style="font-size: small;">
    <!-- STORE TAB -->
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
        {#each Object.entries(merchantData) as [, {url, logo}]}
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

    <!-- HEALTHPOINTS TAB -->
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
      {#each sortedData as [key, {logo, pendingPts, totalPts}]}
        {#if pendingPts > 0 || totalPts > 0}
          <Row style="border-top: 1px solid #dbdbdb; padding: 15px 0;">
            <Col xs="4">
              <img src={logo}  alt="logo-store"/>
            </Col>
            <Col xs="4" style="align-self: center">
              <div style="flex-direction: column; align-self: center; justify-content: start;">
                <Badge style="margin-bottom: 5px" color="light">Claimed: {totalPts} pts</Badge>
                <Badge color="light">Pending: {pendingPts} pts</Badge>
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

    <!-- HISTORY TAB -->
    {#if totalPendingPts > 0 || totalClaimedPts > 0}
      <TabPane
        tabId={TabId.HISTORY}
        tab="Store History"
        active={activeTab === TabId.HISTORY}
      >
        <Orders {merchant} {merchantData} />
      </TabPane>
    {/if}
  </TabContent>
{/key}
<style>
  div {
    display: flex;
    justify-content: left;
  }
</style>
