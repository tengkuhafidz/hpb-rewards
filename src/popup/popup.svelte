<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    Badge,
    Button,
    Col,
    Container,
    Row,
    TabContent,
    TabPane
  } from '@sveltestrap/sveltestrap';
  import { onMount } from 'svelte';
  import {
    Store,
    TabId,
    type DisplayData,
    type MerchantData,
    type MerchantPoints
  } from '../constants';
  import { merchantClaimUrl } from '../utils/merchants';
  import { fetchData, saveData } from '../utils/storage';
  import HealthpointsIcon from './components/HealthpointsIcon.svelte';

  let activeTab: TabId = TabId.HEALTHPOINTS; // Default active tab
  let merchantData: MerchantData = {
    [Store.FAIRPRICE]: {
      logo: 'img/fairprice.jpg',
      url: 'https://www.fairprice.com.sg/',
      pendingPts: 0,
      totalPts: 0
    },
    [Store.SHOPEE]: {
      logo: 'img/shopee.png',
      url: 'https://shopee.sg/',
      pendingPts: 0,
      totalPts: 0
    },
    [Store.LAZADA]: {
      logo: 'img/lazada.png',
      url: 'https://www.lazada.sg/',
      pendingPts: 0,
      totalPts: 0
    },
    [Store.SHENGSIONG]: {
      logo: 'img/shengsiong.png',
      url: 'https://shengsiong.com.sg/',
      pendingPts: 0,
      totalPts: 0
    }
  };
  let data: MerchantPoints;
  let displayData: DisplayData;

  const mockData: MerchantPoints = {
    [Store.FAIRPRICE]: [
      {
        orderId: '179995252',
        points: 5,
        isClaimed: false
      },
      {
        orderId: '64278724',
        points: 10,
        isClaimed: false
      }
    ],
    [Store.LAZADA]: [],
    [Store.SHENGSIONG]: [],
    [Store.SHOPEE]: []
  };

  let totalPendingPts = 0;
  let totalClaimedPts = 0;

  const generateDisplayData = (data: MerchantPoints) => {
    Object.entries(data).forEach(([key, details]) => {
      let merchantPendingPts = 0;
      let merchantTotalPts = 0;

      details.forEach(order => {
        if (order.isClaimed) {
          totalClaimedPts += order.points;
          merchantTotalPts += order.points;
        } else {
          totalPendingPts += order.points;
          merchantPendingPts += order.points;
        }
        merchantData[key as Store].pendingPts = merchantPendingPts;
        merchantData[key as Store].totalPts = merchantTotalPts;
      });
    });

    displayData = Object.entries(merchantData).sort((a, b) => {
      return b[1].pendingPts - a[1].pendingPts || b[1].totalPts - a[1].totalPts;
    }) as DisplayData;
  };

  function handleOnClaimClick(orderId: string) {
    const url = merchantClaimUrl(Store.FAIRPRICE, orderId);
    window.open(url);
  }

  function resetStorage() {
    alert('Demo Reset');
    saveData(mockData, 'userId123');
  }

  async function loadData() {
    const response = await fetchData('userId123');
    // The key is the property
    data = response['userId123'] || mockData;

    if (!data) {
      saveData(mockData, 'userId123'); //for testing
    }

    generateDisplayData(data);
  }

  onMount(() => {
    loadData();
  });
</script>

<div style="padding: 10px; height: 50px;">
  <img src="img/hcs.png" alt="logo" />
  <h1
    style="font-size: medium; align-self: center; margin-bottom: 0; margin-left: 10px;"
  >
  
    Healthier Choice
  </h1>
</div>

{#key activeTab}
  <TabContent>
    <!-- STORE TAB -->
    <TabPane tabId={TabId.STORE} tab="Stores">
      <Container>
        <Row cols={1}>
          {#each Object.entries(merchantData) as [{ url, logo }]}
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

    <!-- HEALTHPOINTS TAB -->
    <TabPane
      tabId={TabId.HEALTHPOINTS}
      tab="Healthpoints"
      active={activeTab === TabId.HEALTHPOINTS}
    >
      <div style="padding: 10px 0; justify-content: space-around;">
        <div style="flex-direction: column;">
          <p style="margin-bottom: 5px">Total Claimed:</p>
          <h6 style="align-self: center;">
            {totalClaimedPts}
            <HealthpointsIcon size={10} />
          </h6>
        </div>
        <div style="flex-direction: column;">
          <p style="margin-bottom: 5px">Total Pending:</p>
          <h6 style="align-self: center;">
            {totalPendingPts}
            <HealthpointsIcon size={10} />
          </h6>
        </div>
      </div>
      <Accordion>
        {#if displayData}
          {#each displayData as [key, { logo, pendingPts, totalPts }]}
            {#if pendingPts > 0 || totalPts > 0}
              <AccordionItem>
                <Row slot="header">
                  <Col>
                    <img src={logo} alt="logo-store" />
                  </Col>
                  <Col style="align-self: center">
                    <div
                      style="flex-direction: column; align-self: center; justify-content: start;"
                    >
                      <p style="margin-bottom: 5px; font-size: small;">
                        Pending
                        <Badge
                          style="margin-left: 5px;"
                          color={pendingPts > 0 ? 'danger' : 'light'}
                          pill
                        >
                          {pendingPts}
                          <HealthpointsIcon
                            size={8}
                            color={pendingPts > 0 ? 'white' : '#E51B24'}
                          />
                        </Badge>
                      </p>
                      <p style="font-size: small; margin-bottom: 0;">
                        Claimed
                        <Badge
                          style="margin-left: 5px;"
                          color={totalPts > 0 ? 'dark' : 'light'}
                          pill
                        >
                          {totalPts}
                          <HealthpointsIcon
                            size={8}
                            color={totalPts > 0 ? 'white' : '#E51B24'}
                          />
                        </Badge>
                      </p>
                    </div>
                  </Col>
                </Row>
                {#if data && data[key]}
                  {#each data[key] as { orderId, points, isClaimed }}
                    <Row
                      style="border-top: 1px solid #dbdbdb; padding: 15px 0;"
                    >
                      <Col xs="8" style="align-self: center">
                        <div style="margin-bottom: 0;">
                          <p style="margin-bottom: 0; font-size: small;">
                            Order ID
                          </p>
                          <div
                            style="margin-left: 5px; height: fit-content; align-self: center;"
                          >
                            <Badge color="dark">{orderId}</Badge>
                          </div>
                          {#if isClaimed}
                            <Badge
                              style="margin-left: 5px; align-self: center;"
                              color="light"
                              pill>Claimed</Badge
                            >
                          {/if}
                        </div>
                      </Col>
                      <Col xs="" style="align-self: center">
                        <Button
                          style="width: 55px; align-self: center; float: right; margin-right: 10px;"
                          size="sm"
                          class="position-relative"
                          color="dark"
                          outline
                          on:click={() => handleOnClaimClick(orderId)}
                        >
                          {isClaimed ? 'View' : 'Claim'}
                          <Badge
                            color={isClaimed ? 'dark' : 'danger'}
                            pill
                            positioned
                            >{points}
                            <HealthpointsIcon size={8} color="white" /></Badge
                          >
                        </Button>
                      </Col>
                    </Row>
                  {/each}
                {/if}
              </AccordionItem>
            {/if}
          {/each}
        {/if}
      </Accordion>
    </TabPane>

    <TabPane
      tabId={TabId.DEVMENU}
      tab="Menu"
      active={activeTab === TabId.DEVMENU}
    >
      <Button
        style="width: 100%; align-self: center;"
        size="sm"
        class="position-relative"
        color="dark"
        outline
        on:click={() => resetStorage()}>RESET</Button
      >
    </TabPane>
  </TabContent>
{/key}

<style>
  div {
    display: flex;
    justify-content: left;
  }
</style>
