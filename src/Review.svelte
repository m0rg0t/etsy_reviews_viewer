<script lang="ts">
    import type {IReviewItem} from './types';
    import StarRating from 'svelte-star-rating';
    import {tick} from 'svelte';
    import {toPng} from 'html-to-image';
    import download from 'downloadjs';
    import {exportImage} from './reviews';
    export let review: IReviewItem;
    export let hideSaveButton = false;
    export let exporting = false;
    let saving = false;
    let error = '';
    let htmlReview: HTMLDivElement;
    const downloadReviewImage = async () => {
        if (exporting || !htmlReview) return;
        error = '';
        try {
            await exportImage({node: htmlReview, tick, capture: toPng,
                save: url => { download(url, `review_from_${review.reviewer}_stars_${review.star_rating}.png`); },
                setBusy: busy => { saving = busy; exporting = busy; }});
        } catch { error = 'Could not export this review. Please try again.'; }
    };
</script>
<div class="review" bind:this={htmlReview}>
    <div class="review-header">
        <span class="review-name">{review.reviewer}</span>
        <span class="review-date">{review.date_reviewed}</span>
        <button class:hide={hideSaveButton || saving} disabled={exporting} on:click={downloadReviewImage}>Save as image</button>
    </div>
    <StarRating rating={review.star_rating}/>
    <p class="review-message">{review.message}</p>
</div>
{#if error}<p role="alert">{error}</p>{/if}

<style>
    .hide {
        display: none;
    }
    .review {
        border: 1px solid gainsboro;
        padding: 20px;
        display: grid;
        margin-bottom: 10px;
        background: white;
    }

    .review-header {
        display: grid;
        gap: 10px;
        grid-template-columns: auto 1fr auto;
        margin-bottom: 10px;
    }

    .review-name {
        text-decoration: underline;
    }

    .review-date, .review-name {
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        color: rgb(89, 89, 89);
    }

    .review-message {
        margin-bottom: 0px;
        margin-top: 0px;
    }
</style>