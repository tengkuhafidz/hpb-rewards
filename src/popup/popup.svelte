<script lang="ts">
  import { TabContent, TabPane, Card, Button, Container, Row, Col } from '@sveltestrap/sveltestrap';

  const merchant = [
    {name: "Fairprice", logo: "img/fairprice.jpg", url: "https://www.fairprice.com.sg/"},
    {name: "Shopee", logo: "img/shopee.png", url: "https://shopee.sg/"},
    {name: "Lazada", logo: "img/lazada.png", url: "https://www.lazada.sg/"},
    {name: "Sheng Siong", logo: "img/shengsiong.png", url: "https://shengsiong.com.sg/"},
  ]
</script>

<div class="header">
  <img src="img/hpb365.png" alt="logo"/>
  <h1 class="header-title">HPB 365 Rewards</h1>
</div>

<TabContent>
  <TabPane tabId="alpha" tab="Stores" active>
    <Container>
      <Row cols={1}>
        {#each merchant as { url, logo, name }, i}
        <Col>
          <div class="stores">
            <a href={url} target="_blank">
              <img src={logo} alt="logo-store"/>
            </a>
          </div>
        </Col>
        {/each}
      </Row>
    </Container>
  </TabPane>
  <TabPane tabId="bravo" tab="Points">
    <h1>your rewards</h1>
  </TabPane>
</TabContent>

<style>
  div {
    display: flex;
    justify-content: left;
  }

  img {
    margin-right: 10px;
  }

  .header{
    padding: 10px;
    height: 50px;
    border-bottom: solid 1px grey;
  }

  h1 {
    font-size: medium;
    align-self: center;
    margin-bottom: 0;
  }

  .stores {
    color: black;
    text-decoration: none;
    margin-top: 10px;
  }

</style>
