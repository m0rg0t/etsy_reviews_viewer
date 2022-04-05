<script lang="ts">
    //@ts-ignore
    import csvDownload from 'json-to-csv-export';
    import Footer from "./Footer.svelte";
    import Review from "./Review.svelte";
    import type {IReviewItem} from "./types";
    import download from 'downloadjs'
    import JSZip from "jszip";
    import * as htmlToImage from "html-to-image";


    export let reviews: Array<IReviewItem> = [];
    export let reviewsRawText: string = `[{"reviewer":"Amy","date_reviewed":"03/04/2022","star_rating":5,"message":"Great product, took its time arriving but in adequate time for the distance it was travelling. It’s made well. I’ve worn it in my hair for a couple of days and it does not budge! Great quality products for a quick and easy up dip that’s a little edgy. I’ll be recommending this shop again.","order_id":2370958767},{"reviewer":"Cécile","date_reviewed":"02/24/2022","star_rating":5,"message":"Very nice and very pleasant seller, thanks!","order_id":2359711045},{"reviewer":"Jaynie","date_reviewed":"02/07/2022","star_rating":5,"message":"Beautiful little item, excellent seller communication, in contact all through the buying and delivery process. Perfect!","order_id":2343770675},{"reviewer":"Rose","date_reviewed":"12/14/2021","star_rating":5,"message":"Wonderful and thoughtful seller. The item is very cute and works well!","order_id":2272118499}]`;
    //export let reviewsRawText: string = `[]`;
    reviews = JSON.parse(reviewsRawText)

    const onDownloadCsv = () => {
        csvDownload(JSON.parse(reviewsRawText), 'reviews.csv', ';');
    }

    const onChangeReviewsTextarea = () => {
        reviews = JSON.parse(reviewsRawText)
    }

    const uploadJson = async (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = async (e: any) => {
            reviews = JSON.parse(e.target.result);
            reviewsRawText = JSON.stringify(reviews);
        }
    }

    let reviewsList;
    let hideAllSaveButtons = false;

    const onDownloadAllImages = async () => {
        hideAllSaveButtons = true;
        //const images = reviews.map(review => review.image);
        htmlToImage.toPng(reviewsList)
            .then(function (dataUrl) {
                download(dataUrl, 'all_reviews.png');
                hideAllSaveButtons = false;
            });
    }
</script>

<header>
    <h1>Etsy review prettier</h1>
    <div class="input-reviews">
        <label for="json">Please enter your json</label>
        <textarea name="json" id="json" on:change={onChangeReviewsTextarea} class="reviews-json"
                  bind:value={reviewsRawText}></textarea>
        <label for="upload_json">Or upload a json file</label>
        <input id="upload_json" name="upload_json" type="file" accept=".json" on:change={uploadJson}/>
        <hr/>
        <button on:click={onDownloadCsv}>Download CSV (for Excel)</button>
        <button on:click={onDownloadAllImages}>Download all review images</button>
    </div>
</header>
<main>
    <h2>Reviews list</h2>
    <div id="reviews-list" bind:this={reviewsList}>
        {#each reviews as review}
            <Review review={review} hideSaveButton={hideAllSaveButtons}/>
        {/each}
    </div>
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