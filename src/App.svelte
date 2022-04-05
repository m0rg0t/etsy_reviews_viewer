<script lang="ts">
    //@ts-ignore
    import csvDownload from 'json-to-csv-export';
    import Footer from "./Footer.svelte";
    import Review from "./Review.svelte";
    import type {IReviewItem} from "./types";

    export let reviews: Array<IReviewItem> = [];
    export let reviewsRawText: string = `[{"reviewer":"Amy","date_reviewed":"03/04/2022","star_rating":5,"message":"Great product, took its time arriving but in adequate time for the distance it was travelling. It’s made well. I’ve worn it in my hair for a couple of days and it does not budge! Great quality products for a quick and easy up dip that’s a little edgy. I’ll be recommending this shop again.","order_id":2370958767},{"reviewer":"Cécile","date_reviewed":"02/24/2022","star_rating":5,"message":"Very nice and very pleasant seller, thanks!","order_id":2359711045},{"reviewer":"Jaynie","date_reviewed":"02/07/2022","star_rating":5,"message":"Beautiful little item, excellent seller communication, in contact all through the buying and delivery process. Perfect!","order_id":2343770675},{"reviewer":"Rose","date_reviewed":"12/14/2021","star_rating":5,"message":"Wonderful and thoughtful seller. The item is very cute and works well!","order_id":2272118499}]`;
    reviews = JSON.parse(reviewsRawText)

    const onDownloadCsv = () => {
        csvDownload(JSON.parse(reviewsRawText), 'reviews.csv', ';');
    }

    const onChangeReviewsTextarea = () => {
        reviews = JSON.parse(reviewsRawText)
    }
</script>

<header>
    <h1>Etsy review prettier</h1>
    <div class="input-reviews">
        <label>Please enter your json</label>
        <textarea on:change={onChangeReviewsTextarea} class="reviews-json" bind:value={reviewsRawText}></textarea>
        <button on:click={onDownloadCsv}>Download CSV (for Excel)</button>
    </div>
</header>
<main>
    <h2>Reviews list</h2>
    {#each reviews as review}
        <Review review={review}/>
    {/each}
</main>
<Footer/>

<style>
    header {
        text-align: center;
        padding: 1em;
        /*max-width: 240px;*/
        margin: 0 auto;
        width: calc(100% - 2em);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    main {
        padding: 20px;
    }

    .input-reviews {
        width: 80%;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }

    .reviews-json {
        width: 90%;
        height: 200px;
    }
</style>