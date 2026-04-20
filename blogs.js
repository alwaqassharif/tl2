const blogs = [
  {
    title: "SEO Tips for 2026",
    category: "SEO",
    image: "img/blog-1.jpg",
    date: "2026-04-20"
  },
  {
    title: "Guest Posting Guide",
    category: "Marketing",
    image: "img/blog-2.jpg",
    date: "2026-04-18"
  },
  {
    title: "Amazing postcards when visiting India",
    category: "TRAVEL",
    image: "img/blog-3.jpg",
    date: "2026-04-15"
  },
  {
    title: "Beautiful destinations in South America",
    category: "TRAVEL",
    image: "img/blog-4.jpg",
    date: "2026-04-10"
  },
  {
    title: "New SEO Trends",
    category: "SEO",
    image: "img/blog-1.jpg",
    date: "2026-04-22"
  }
];

// 🔥 Latest first sorting
blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

// Pagination settings
const blogsPerPage = 2;
let currentPage = 1;

function displayBlogs() {
  const container = document.getElementById("blog-container");
  container.innerHTML = "";

  const start = (currentPage - 1) * blogsPerPage;
  const end = start + blogsPerPage;
  const paginatedBlogs = blogs.slice(start, end);

  paginatedBlogs.forEach(blog => {
    const formattedDate = new Date(blog.date).toDateString();

    container.innerHTML += `
      <div class="col-lg-6 col-md-6">
        <div class="card border-0 shadow-sm">
          <div class="position-relative">
            <img src="${blog.image}" class="card-img-top">
            <span class="badge bg-danger position-absolute top-0 start-0 m-2">${blog.category}</span>
          </div>
          <div class="card-body">
            <h5 class="card-title">${blog.title}</h5>
            <small>by <span class="text-danger">Admin</span> - ${formattedDate}</small>
          </div>
        </div>
      </div>
    `;
  });
}

function setupPagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const pageCount = Math.ceil(blogs.length / blogsPerPage);

  for (let i = 1; i <= pageCount; i++) {
    pagination.innerHTML += `
      <button class="btn btn-sm btn-primary m-1" onclick="changePage(${i})">${i}</button>
    `;
  }
}

function changePage(page) {
  currentPage = page;
  displayBlogs();
}

// Initial load
displayBlogs();
setupPagination();
