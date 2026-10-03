<script lang="ts">
    import csvDownload from 'json-to-csv-export';
    import {tick} from 'svelte';
    import Footer from './Footer.svelte';
    import Review from './Review.svelte';
    import type {IReviewItem} from './types';
    import download from 'downloadjs';
    import {toPng} from 'html-to-image';
    import {parseReviews, exportImage} from './reviews';
    export let reviews: IReviewItem[] = [];
    export let reviewsRawText: string = `[{"reviewer":"Amy","date_reviewed":"03/04/2022","star_rating":5,"message":"Great product, took its time arriving but in adequate time for the distance it was travelling. It’s made well. I’ve worn it in my hair for a couple of days and it does not budge! Great quality products for a quick and easy up dip that’s a little edgy. I’ll be recommending this shop again.","order_id":2370958767},{"reviewer":"Cécile","date_reviewed":"02/24/2022","star_rating":5,"message":"Very nice and very pleasant seller, thanks!","order_id":2359711045},{"reviewer":"Jaynie","date_reviewed":"02/07/2022","star_rating":5,"message":"Beautiful little item, excellent seller communication, in contact all through the buying and delivery process. Perfect!","order_id":2343770675},{"reviewer":"Rose","date_reviewed":"12/14/2021","star_rating":5,"message":"Wonderful and thoughtful seller. The item is very cute and works well!","order_id":2272118499}]`;
    let error = '';
    let importRevision = 0;
    let reviewsList: HTMLDivElement;
    let hideAllSaveButtons = false;
    let exporting = false;
    try { reviews = parseReviews(reviewsRawText); }
    catch (reason) { error = String(reason); }
    const applyReviews = (text: string) => {
        try {
            const next = parseReviews(text);
            reviews = next;
            error = '';
            return true;
        } catch (reason) { error = reason instanceof Error ? reason.message : String(reason); return false; }
    };
    const onChangeReviewsTextarea = (event: Event) => {
        importRevision++;
        reviewsRawText = (event.currentTarget as HTMLTextAreaElement).value;
        applyReviews(reviewsRawText);
    };
    const uploadJson = async (event: Event) => {
        const input = event.currentTarget as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;
        const revision = ++importRevision;
        try {
            const text = await file.text();
            if (revision !== importRevision) return;
            if (applyReviews(text)) reviewsRawText = JSON.stringify(reviews);
        } catch { if (revision === importRevision) error = 'Could not read this file. Please try again.'; }
        finally { input.value = ''; }
    };
    const onDownloadCsv = () => {
        if (!applyReviews(reviewsRawText)) return;
        csvDownload({data: reviews, filename: 'reviews', delimiter: ';'});
    };
    const onDownloadAllImages = async () => {
        if (exporting || !reviewsList) return;
        error = '';
        try {
            await exportImage({node: reviewsList, tick, capture: toPng,
                save: url => { download(url, 'all_reviews.png'); },
                setBusy: busy => { exporting = busy; hideAllSaveButtons = busy; }});
        } catch { error = 'Could not export images. Your reviews are unchanged. Please try again.'; }
    };
</script>
<header>
    <h1>Etsy review prettier</h1>
    <div class="input-reviews">
        <label for="json">Please enter your json</label>
        <textarea name="json" id="json" on:input={onChangeReviewsTextarea} class="reviews-json" bind:value={reviewsRawText}></textarea>
        <label for="upload_json">Or upload a json file</label>
        <input id="upload_json" name="upload_json" type="file" accept=".json" on:change={uploadJson}/>
        {#if error}<p role="alert">{error}</p>{/if}
        <hr/>
        <button on:click={onDownloadCsv} disabled={exporting}>Download CSV (for Excel)</button>
        <button on:click={onDownloadAllImages} disabled={exporting}>Download all review images</button>
    </div>
</header>
<main>
    <h2>Reviews list</h2>
    <div id="reviews-list" bind:this={reviewsList}>
        {#each reviews as review}
            <Review {review} hideSaveButton={hideAllSaveButtons} bind:exporting/>
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