import React from "react";
import HeaderRe from "../common/HeaderRe";
import Sidebar from "../common/Sidebar";

const Package = () => {
  return (
    <div>
      <HeaderRe></HeaderRe>
      <Sidebar></Sidebar>

      <main id="main" class="main">
        <div class="pagetitle">
          <h1>Breadcrumbs</h1>
          <nav>
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="index.html">Home</a>
              </li>
              <li class="breadcrumb-item">Components</li>
              <li class="breadcrumb-item active">Breadcrumbs</li>
            </ol>
          </nav>
        </div>

        <section class="section">
          <div class="row">
            <div class="col-lg-9">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Default Breadcrumbs</h5>

                  <nav>
                    <ol class="breadcrumb">
                      <li class="breadcrumb-item">
                        <a href="index.html">Home</a>
                      </li>
                      <li class="breadcrumb-item">
                        <a href="#">Library</a>
                      </li>
                      <li class="breadcrumb-item active">Default</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>

            <div class="col-lg-3">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Breadcrumbs with a page title</h5>

                  <div class="pagetitle">
                    <h1>Page Title</h1>
                    <nav>
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                          <a href="index.html">Home</a>
                        </li>
                        <li class="breadcrumb-item">Components</li>
                        <li class="breadcrumb-item active">Breadcrumbs</li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Package;
