let postData;
const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => showCategory(data.data.news_category));
};

const showCategory = (data) => {
  //   console.log(data);
  const categoryContainer = document.getElementById("category-container");
  data.forEach((categoryName) => {
    const li = document.createElement("li");
    li.innerHTML = `<button href="#" class="text-[#858585] font-semibold" onclick="loadSinglePost('${
      categoryName.category_id ? categoryName.category_id : "01"
    }');">${categoryName.category_name}</button>`;
    // console.log(categoryName);
    categoryContainer.appendChild(li);
  });
};

const loadSinglePost = (postId) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${postId}`)
    .then((res) => res.json())
    .then((data) => showPosts(data.data));
};

const showPosts = (posts) => {
  //   console.log(posts);
  postData = posts;
  const postContainer = document.getElementById("post-container");
  const showItemsNumbers = document.getElementById("found-item-show");
  //   posts = posts.slice(0, 5);
  const postLength = posts.length;
  showItemsNumbers.innerHTML = postLength;
  //   console.log(posts);

  postContainer.innerHTML = "";
  posts.forEach((post) => {
    const description = post.details.slice(0, 450);
    const div = document.createElement("div");
    div.setAttribute("class", "grid grid-cols-4 gap-6 px-6 items-center mb-16");
    div.innerHTML = `
    <div>
              <figure>
                <img src="${post.thumbnail_url}" class="w-full" alt="" />
              </figure>
            </div>
            <div id="content" class="col-span-3">
              <div>
                <h2 class="text-3xl font-semibold text-black mb-4">
                  ${post.title}
                </h2>
                <p class="mb-6 text-gray-500">
                  ${description}
                </p>
              </div>
              <div class="flex justify-between items-center mt-10">
                <div class="flex items-center">
                  <img src="${
                    post.author.img
                  }" class="mr-3 w-10 h-10 rounded-full" alt="" />
                  <div>
                    <h3 id="author-name" class="font-semibold">${
                      post.author.name ? post.author.name : "No Name"
                    }</h3>
                    <span id="data" class="text-gray-400">${
                      post.author.published_date
                    }</span>
                  </div>
                </div>
                <div>
                  <p>
                    <span><i class="ri-eye-line"></i></span>
                    <span id="view">${
                      post.total_view ? post.total_view : "New"
                    }</span>
                  </p>
                </div>
                <div class="rating text-yellow-500">
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-half-fill"></i>
                </div>
                <div>
                  <button
                    id="show-details"
                    class="text-sky-300 font-bold text-2xl"
                  >
                    <i class="ri-arrow-right-line"></i>
                  </button>
                </div>
              </div>
            </div>
    `;
    postContainer.appendChild(div);
  });
};

const loadTrendingProduct = () => {
  document
    .getElementById("trending-post")
    .addEventListener("click", function () {
      const postContainer = document.getElementById("post-container");
      const result = postData.filter((post) => {
        return post.others_info.is_trending === true;
      });
      const showItemsNumbers = document.getElementById("found-item-show");
      //   posts = posts.slice(0, 5);
      const postLength = result.length;
      showItemsNumbers.innerHTML = postLength;
      //   console.log(result);
      postContainer.innerHTML = "";
      result.forEach((post) => {
        const description = post.details.slice(0, 450);
        // loadTrendingProduct(`${post.others_info.is_trending}`);

        const div = document.createElement("div");
        div.setAttribute(
          "class",
          "grid grid-cols-4 gap-6 px-6 items-center mb-16"
        );
        div.innerHTML = `
    <div>
              <figure>
                <img src="${post.thumbnail_url}" class="w-full" alt="" />
              </figure>
            </div>
            <div id="content" class="col-span-3">
              <div>
                <h2 class="text-3xl font-semibold text-black mb-4">
                  ${post.title}
                </h2>
                <p class="mb-6 text-gray-500">
                  ${description}
                </p>
              </div>
              <div class="flex justify-between items-center mt-10">
                <div class="flex items-center">
                  <img src="${post.author.img}" class="mr-3 w-10 h-10 rounded-full" alt="" />
                  <div>
                    <h3 id="author-name" class="font-semibold">${post.author.name}</h3>
                    <span id="data" class="text-gray-400">${post.author.published_date}</span>
                  </div>
                </div>
                <div>
                  <p>
                    <span><i class="ri-eye-line"></i></span>
                    <span id="view">${post.total_view}</span>
                  </p>
                </div>
                <div class="rating">
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-half-fill"></i>
                </div>
                <div>
                  <button
                    id="show-details"
                    class="text-sky-300 font-bold text-2xl"
                  >
                    <i class="ri-arrow-right-line"></i>
                  </button>
                </div>
              </div>
            </div>
    `;
        postContainer.appendChild(div);
      });
    });
};
loadSinglePost("02");
loadTrendingProduct();
loadCategory();

const d = new Date("2015-03-25");
console.log(d);
