##card

###card
    @example
    <article class="card">
        <div class="card__thumbnail js-lazy" data-original="//dummyimage.com/528x175/ccc/fff&text=image">
            <div class="card__overlay">
                <p class="card__shopName">店舗名</p>
                <div class="card__info">
                    <p class="-text-overflow">アクセス</p>
                    <p class="-text-overflow">席情報</p>
                </div>
            </div>
        </div>
        <div class="card__textbox">
            <p class="-text-overflow -bold">番組名</p>
            <p class="mg2t">放送日時</p>
        </div>
    </article>

###card--2col
    @example
    <div class="flex">
        <article class="card-2col flex__item">
            <div class="card-2col__thumbnail js-lazy" data-original="../dist/img/contents_card-2col_no_image.jpg"></div>
            <div class="card-2col__textbox">
                <h3 class="card-2col__shopName">店舗名</h3>
                <p class="card-2col__access">アクセス</p>
            </div>
        </article>
        <article class="card-2col flex__item">
            <div class="card-2col__thumbnail js-lazy" data-original="../dist/img/contents_card-2col_no_image.jpg"></div>
            <div class="card-2col__textbox">
                <h3 class="card-2col__shopName">店舗名</h3>
                <p class="card-2col__access">アクセス</p>
            </div>
        </article>
    </div>
