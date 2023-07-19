import "./styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

//https://dummyjson.com/products?limit=100

export default function App() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const fetchProductApi = async () => {
    try {
      const result = await axios.get(
        `https://dummyjson.com/products?limit=100`
      );
      setPageData(result.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductApi();
  }, []);

  const selectPagesNo = (selectpage) => {
    if (
      selectpage >= 1 &&
      selectpage <= pageData.length / 10 &&
      selectpage !== page
    ) {
      setPage(selectpage);
    }
  };

  return (
    <div className="App">
      <h1 style={{ width: "100%", height: "6vh", background: "lightblue" }}>
        Pagination{" "}
      </h1>
      <div className="productslist">
        <div className="product">
          {pageData &&
            pageData.slice(page * 10 - 10, page * 10).map((item, index) => {
              return (
                <div className="pageItem" key={index}>
                  <img src={item.thumbnail} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              );
            })}
        </div>
        <div className="pagination">
          <span className="prev" onClick={() => selectPagesNo(page - 1)}>
            {" "}
            prev
          </span>
          {pageData.length > 0 &&
            [...Array(pageData.length / 10)].map((it, ind) => {
              return (
                <span
                  className={page === ind + 1 ? "pages slelectpagse" : "pages"}
                  key={ind}
                  onClick={() => selectPagesNo(ind + 1)}
                >
                  {ind + 1}
                </span>
              );
            })}

          <span className="next" onClick={() => selectPagesNo(page + 1)}>
            next
          </span>
        </div>
      </div>
    </div>
  );
}
