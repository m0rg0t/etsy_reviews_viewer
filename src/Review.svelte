<script lang="ts">
    import type {IReviewItem} from "./types";
    //@ts-ignore
    import StarRating from 'svelte-star-rating';
    import {toPng} from 'html-to-image';
    import * as htmlToImage from "html-to-image";
    import download from 'downloadjs'

    export let review: IReviewItem;
    export let hideSaveButton: boolean = false;
    let htmlReview;
    //let hideSaveImageButton = false || hideSaveButton;

    const downloadReviewImage = () => {
        hideSaveButton = true;
        htmlToImage.toPng(htmlReview)
            .then(function (dataUrl) {
                download(dataUrl, `review_from_${review.reviewer}_stars_${review.star_rating}.png`);
                hideSaveButton = false;
            });
    }
</script>

<div class="review" bind:this={htmlReview}>
    <div class="review-header">
        <span class="review-name">{review.reviewer}</span>
        <span class="review-date">{review.date_reviewed}</span>
        <button class:hide={hideSaveButton} on:click={downloadReviewImage}>Save as image
        </button>
    </div>
    <StarRating rating={review.star_rating}/>
    <p class="review-message">{review.message}</p>

</div>

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