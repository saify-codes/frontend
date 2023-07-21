import React from "react";

export default function page() {
  return (
    <>
      {/* Topic section */}
      <section className="container mt-5">
        <h1 className="fw-bold mb-3 ">Hot Topics</h1>
        <div className="row gy-3">
          <div
            className="col-lg-9 d-flex align-items-end rounded-3"
            style={{
              background:
                'linear-gradient(to top, #0008, #0000), url("/swimmer.jpg") center / cover',
              backgroundBlendMode: "multiply",
            }}
          >
            {/* <img className="w-100" src="/swimmer.jpg" alt="swimmer" /> */}
            <div className="heading text-white py-5 px-2">
              <h2
                className="w-50 fw-bold "
                style={{ fontFamily: "Playfair Display" }}
              >
                Massa tortor nibh nulla condimentum imperdiet scelerisque...
              </h2>
              <div>
                <small className="me-3">2 Hour Ago</small>
                <small>CNN Indonesia</small>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <p className="fs-5" style={{ fontFamily: "Playfair Display" }}>
              <span className="fs-1">Nisi,</span>
              sagittis aliquet sit rutrum. Nunc, id vestibulum quam ornare
              adipiscing. Pellentesque sed turpis nunc gravida pharetra, sit nec
              vivamus pharetra. Velit, dui, egestas nisi, elementum mattis
              mauris, magnis. Massa tortor nibh nulla condimentum imperdiet
              scelerisque... read more
            </p>
          </div>
        </div>
      </section>

      {/* Latest new section */}
      <section className="container mt-5">
        <h1 className="fw-bold mb-3 ">Latest News</h1>
        <div className="row row-cols-lg-4 row-cols-md-3 row-cols-1 ">
          <div className="col">
            <div class="card mb-3 border-0">
              <img src="/card_img_1.jpg" class="card-img-top" alt="img" />
              <div class="card-body px-0">
                <h5 class="card-title fw-bold ">
                  News Title Lorem Ipsum Dolor Sit Amet
                </h5>
                <p class="card-text">
                  <small class="text-muted me-3 ">1 Hour Ago</small>
                  <small class="text-muted">CNN Indonesia</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card mb-3 border-0">
              <img src="/card_img_1.jpg" class="card-img-top" alt="img" />
              <div class="card-body px-0">
                <h5 class="card-title fw-bold ">
                  News Title Lorem Ipsum Dolor Sit Amet
                </h5>
                <p class="card-text">
                  <small class="text-muted me-3 ">1 Hour Ago</small>
                  <small class="text-muted">CNN Indonesia</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card mb-3 border-0">
              <img src="/card_img_1.jpg" class="card-img-top" alt="img" />
              <div class="card-body px-0">
                <h5 class="card-title fw-bold ">
                  News Title Lorem Ipsum Dolor Sit Amet
                </h5>
                <p class="card-text">
                  <small class="text-muted me-3 ">1 Hour Ago</small>
                  <small class="text-muted">CNN Indonesia</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card mb-3 border-0">
              <img src="/card_img_1.jpg" class="card-img-top" alt="img" />
              <div class="card-body px-0">
                <h5 class="card-title fw-bold ">
                  News Title Lorem Ipsum Dolor Sit Amet
                </h5>
                <p class="card-text">
                  <small class="text-muted me-3 ">1 Hour Ago</small>
                  <small class="text-muted">CNN Indonesia</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card mb-3 border-0">
              <img src="/card_img_1.jpg" class="card-img-top" alt="img" />
              <div class="card-body px-0">
                <h5 class="card-title fw-bold ">
                  News Title Lorem Ipsum Dolor Sit Amet
                </h5>
                <p class="card-text">
                  <small class="text-muted me-3 ">1 Hour Ago</small>
                  <small class="text-muted">CNN Indonesia</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card mb-3 border-0">
              <img src="/card_img_1.jpg" class="card-img-top" alt="img" />
              <div class="card-body px-0">
                <h5 class="card-title fw-bold ">
                  News Title Lorem Ipsum Dolor Sit Amet
                </h5>
                <p class="card-text">
                  <small class="text-muted me-3 ">1 Hour Ago</small>
                  <small class="text-muted">CNN Indonesia</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card mb-3 border-0">
              <img src="/card_img_1.jpg" class="card-img-top" alt="img" />
              <div class="card-body px-0">
                <h5 class="card-title fw-bold ">
                  News Title Lorem Ipsum Dolor Sit Amet
                </h5>
                <p class="card-text">
                  <small class="text-muted me-3 ">1 Hour Ago</small>
                  <small class="text-muted">CNN Indonesia</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card mb-3 border-0">
              <img src="/card_img_1.jpg" class="card-img-top" alt="img" />
              <div class="card-body px-0">
                <h5 class="card-title fw-bold ">
                  News Title Lorem Ipsum Dolor Sit Amet
                </h5>
                <p class="card-text">
                  <small class="text-muted me-3 ">1 Hour Ago</small>
                  <small class="text-muted">CNN Indonesia</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card mb-3 border-0">
              <img src="/card_img_1.jpg" class="card-img-top" alt="img" />
              <div class="card-body px-0">
                <h5 class="card-title fw-bold ">
                  News Title Lorem Ipsum Dolor Sit Amet
                </h5>
                <p class="card-text">
                  <small class="text-muted me-3 ">1 Hour Ago</small>
                  <small class="text-muted">CNN Indonesia</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card mb-3 border-0">
              <img src="/card_img_1.jpg" class="card-img-top" alt="img" />
              <div class="card-body px-0">
                <h5 class="card-title fw-bold ">
                  News Title Lorem Ipsum Dolor Sit Amet
                </h5>
                <p class="card-text">
                  <small class="text-muted me-3 ">1 Hour Ago</small>
                  <small class="text-muted">CNN Indonesia</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card mb-3 border-0">
              <img src="/card_img_1.jpg" class="card-img-top" alt="img" />
              <div class="card-body px-0">
                <h5 class="card-title fw-bold ">
                  News Title Lorem Ipsum Dolor Sit Amet
                </h5>
                <p class="card-text">
                  <small class="text-muted me-3 ">1 Hour Ago</small>
                  <small class="text-muted">CNN Indonesia</small>
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card mb-3 border-0">
              <img src="/card_img_1.jpg" class="card-img-top" alt="img" />
              <div class="card-body px-0">
                <h5 class="card-title fw-bold ">
                  News Title Lorem Ipsum Dolor Sit Amet
                </h5>
                <p class="card-text">
                  <small class="text-muted me-3 ">1 Hour Ago</small>
                  <small class="text-muted">CNN Indonesia</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
