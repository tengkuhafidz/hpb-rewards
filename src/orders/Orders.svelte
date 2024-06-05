<script>
  import { Store } from '../constants';
  import { onMount } from 'svelte';
  import { merchantClaimUrl } from '../utils/merchants';
  import { fetchData } from '../utils/storage';
  export let merchant;
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
    <div class="header">Claimable points for {merchant}</div>
    <p class="description">
      Note: You are only able to claim the points when the products are received
      and marked as delivered or completed.
    </p>
  </div>

  {#if data && data[merchant]?.length > 0}
    {#each data[merchant] as { orderId, points }}
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
{/key}

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
