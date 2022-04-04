<script lang="ts">
	interface IReviewItem {
		reviewer: string
		date_reviewed: string
		star_rating: number
		message: string
		order_id: number
	}

	export let reviews = Array<IReviewItem>;
	export let reviewsRawText: string = `[{"reviewer":"Amy","date_reviewed":"03/04/2022","star_rating":5,"message":"Great product, took its time arriving but in adequate time for the distance it was travelling. It’s made well. I’ve worn it in my hair for a couple of days and it does not budge! Great quality products for a quick and easy up dip that’s a little edgy. I’ll be recommending this shop again.","order_id":2370958767},{"reviewer":"Cécile","date_reviewed":"02/24/2022","star_rating":5,"message":"Very nice and very pleasant seller, thanks!","order_id":2359711045},{"reviewer":"Jaynie","date_reviewed":"02/07/2022","star_rating":5,"message":"Beautiful little item, excellent seller communication, in contact all through the buying and delivery process. Perfect!","order_id":2343770675},{"reviewer":"Rose","date_reviewed":"12/14/2021","star_rating":5,"message":"Wonderful and thoughtful seller. The item is very cute and works well!","order_id":2272118499}]`;
</script>

<main>
	<h1>Etsy review prettier</h1>
	<label>Please copy your json</label>
	<textarea bind:value={reviewsRawText}></textarea>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
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
</style>