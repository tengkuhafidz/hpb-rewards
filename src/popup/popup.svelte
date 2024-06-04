<script lang="ts">
  import {
    Col,
    Container,
    Row,
    TabContent,
    TabPane
  } from '@sveltestrap/sveltestrap';
  import Orders from '../orders/Orders.svelte';
  import { Store, TabId } from '../constants';

  let merchant = Store.FAIRPRICE;
  let activeTab: TabId = TabId.HEALTHPOINTS; // Default active tab

  const totalClaimedPts = 100;
  const totalPendingPts = 200;
  const data = {
    [Store.FAIRPRICE]: {
      logo: 'img/fairprice.jpg',
      url: 'https://www.fairprice.com.sg/',
      pendingPts: 100,
      totalPts: 100
    },
    [Store.SHOPEE]: {
      logo: 'img/shopee.png',
      url: 'https://shopee.sg/',
      pendingPts: 10,
      totalPts: 200
    },
    [Store.LAZADA]: {
      logo: 'img/lazada.png',
      url: 'https://www.lazada.sg/',
      pendingPts: 100,
      totalPts: 100
    },
    [Store.SHENGSIONG]: {
      logo: 'img/shengsiong.png',
      url: 'https://shengsiong.com.sg/',
      pendingPts: 0,
      totalPts: 200
    }
  };

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
</script>

<div class="header">
  <img src="img/hpb365.png" alt="logo" />
  <h1 class="header-title">Healthy 365</h1>
</div>
{#key activeTab}
  <TabContent on:tab={setActiveTab}>
    <TabPane
      tabId={TabId.SCORE}
      tab="Stores"
      active={activeTab === TabId.SCORE}
    >
      <Container>
        <Row cols={1}>
          {#each Object.entries(data) as [{ url, logo }]}
            <Col>
              <div style="margin-top: 10px;">
                <a href={url} target="_blank">
                  <img src={logo} alt="logo-store" />
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
      <div style="padding: 10px 0; flex-direction: column;">
        <h5>Total Claimed: {totalClaimedPts} pts</h5>
        <h5 style="margin-bottom: 0;">Total Pending: {totalPendingPts} pts</h5>
      </div>
      {#each sortedData as [key, { logo, pendingPts, totalPts }]}
        <div
          style="flex-direction: column; border-top: 1px solid #dbdbdb; padding: 15px 0;"
        >
          <div
            style="flex: 1; justify-content: space-between; margin-right: 10px;"
          >
            <img style="height: 50px;" src={logo} alt="logo-store" />
            <button
              disabled={pendingPts === 0}
              on:click={() => setMerchantAndNavigate(key)}>View</button
            >
          </div>
          <div style="justify-content: space-between; margin-top: 5px;">
            <h6 style="align-self: center; margin-bottom: 0">
              Claimed: {totalPts} pts
            </h6>
            <h6 style="align-self: center; margin-bottom: 0">
              Pending: {pendingPts} pts
            </h6>
          </div>
        </div>
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
