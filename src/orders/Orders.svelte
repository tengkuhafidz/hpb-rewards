<script>
  import { Alert, Badge, Button, Row, Col } from '@sveltestrap/sveltestrap';
  import { Store } from '../constants';
  import { onMount } from 'svelte';
  import { merchantClaimUrl } from '../utils/merchants';
  import { fetchData } from '../utils/storage';
  export let merchant;
  export let merchantData;
  let data;

  function handleOnClaimClick(orderId) {
    window.open(merchantClaimUrl(Store.FAIRPRICE, orderId));
  }

  async function loadData() {
    const response = await fetchData('userId123');
    // The key is the property
    data = response["userId123"];
  }


  onMount(() => {
    loadData();
  });
</script>

{#key data}
<div>
  <div style="padding: 10px 0; flex-direction: column; border-bottom: 1px solid #dbdbdb;">
    <img style="height: 50px; margin-bottom: 10px;" src={merchantData[merchant].logo} alt="logo-store"/>
    <Alert
      style="font-size: small; padding: 10px;"
      children="Note: You are only able to claim the points when the products are received
      and marked as delivered or completed."
      color="warning"
      dismissible={false}
      isOpen
    />
  </div>
</div>  
  {#if data}
    {#each data[merchant] as { orderId, points, isClaimed }}
      <Row style="border-top: 1px solid #dbdbdb; padding: 15px 0;">
        <Col xs="3" style="align-self: center">
            <p style="margin-bottom: 0; font-size: small;">Order ID</p><Badge color="dark">{orderId}</Badge>
        </Col>
        <Col xs="5" style="align-self: center">
          <div style="flex-direction: column; align-self: center; justify-content: start;">
            <Badge color="light">{isClaimed ? "Claimed" : "Pending"}: {points} pts</Badge>
          </div>
        </Col>
        <Col xs="4" style="align-self: center">
          {#if !isClaimed}
            <Button style="width: 55px; align-self: center; float: right; margin-right: 10px;" size="sm" class="position-relative" color="warning" on:click={() => handleOnClaimClick(orderId)}>
                Claim
                <Badge color="danger" pill positioned ariaLabel="Unread messages">{points}</Badge> 
            </Button>
          {/if}
        </Col>
      </Row>
    {/each}
  {/if}
{/key}
