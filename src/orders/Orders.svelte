<script>
  import { Store } from '../constants';
  import { onMount } from 'svelte';
  import { merchantClaimUrl } from '../utils/merchants';
  export let merchant;

  const points = {
    [Store.FAIRPRICE]: [
      {
        orderId: '64278724',
        points: 10
      },
      {
        orderId: '64278723',
        points: 5
      },
      {
        orderId: '64278722',
        points: 5
      }
    ],
    [Store.LAZADA]: [],
    [Store.SHENGSIONG]: [],
    [Store.SHOPEE]: []
  };

  function handleOnClaimClick(orderId) {
    window.open(merchantClaimUrl(Store.FAIRPRICE, orderId));
  }

  let merchantPoints;

  onMount(() => {
    merchantPoints = points[merchant];
  });
</script>

<div>
  <div class="header">Claimable points for {merchant}</div>
  <p class="description">
    Note: You are only able to claim the points when the products are received
    and marked as delivered or completed.
  </p>
</div>

{#if merchantPoints?.length > 0}
  {#each merchantPoints as { orderId, points }}
    <div
      style="flex-direction: column; border-top: 1px solid #dbdbdb; padding: 15px 0;"
    >
      <div>Order Id:{orderId}</div>
      <div>Points Claimable:{points}</div>
      <button on:click={() => handleOnClaimClick(orderId)}>Claim</button>
    </div>
  {/each}
{:else}
  <p>No points available.</p>
{/if}

<style>
  .header {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .description {
    font-style: italic;
    color: #666;
  }
</style>
