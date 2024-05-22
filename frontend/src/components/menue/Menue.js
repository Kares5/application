import React, { useEffect, useState } from "react";
import styles from "./menue.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/cart";
import { useFavorite } from "../../context/favorite";

const Menue = () => {
  const navigate = useNavigate();

  const [toggelCat, setToggelCat] = useState(false);
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [checked, setChecked] = useState([]);

  const [search, setSearch] = useState("");

  const { addToCart } = useCart([]);
  const [favorite, setfavorite] = useFavorite([]);

  // get all cats
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/category/get-category"
      );
      setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
    getTotal();
  }, []);

  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/product/product-list/${page}`
      );
      const pro=data.products.map((item)=> ({...item,id:item._id}))
      setLoading(false);
      setProducts(pro);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/product/product-count"
      );
      setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  // load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length) getAllProducts();
  }, [checked.length]);

  useEffect(() => {
    if (checked.length) filteredProducts();
  }, [checked]);

  const filteredProducts = async () => {
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/product/product-filter`,
        { checked }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}> OUR MENUE</h1>
      <div className={styles.filters}>
        <button onClick={() => window.location.reload()}>Reset</button>

        <div className={styles.searchProduct}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name .."
          />
        </div>

        <div className={styles.filterList}>
          <h3
            className={styles.filterTiltle}
            onClick={() => setToggelCat(!toggelCat)}
          >
            Filter by Category
            <i className="bi bi-arrow-down-short"></i>
          </h3>
          <div
            className={styles.listCategory}
            style={{ display: toggelCat && "block" }}
          >
            {categories.map((c) => (
              <div className={styles.singleCategory} key={c._id}>
                <input
                  id={c._id}
                  type="checkbox"
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                />
                <label htmlFor={c._id}> {c.name} </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.productsContainer}>
        {products
          .filter((p) => p.name.toLowerCase().includes(search))
          .map((p) => (
            <div className={styles.Singleproduct}>
              <div className={styles.imageProduct}>
                <img
                  src={`http://localhost:5000/api/product/product-photo/${p._id}`}
                  alt={p.name}
                />

                <div
                  className={styles.heartIcon}
                  onClick={() => {
                    const isExist = favorite.find((x) => x._id === p._id);
                    if (isExist) {
                      toast.error("Item already added to cart ");
                      return;
                    }
                    setfavorite([...favorite, p]);
                    localStorage.setItem(
                      "favorite",
                      JSON.stringify([...favorite, p])
                    );
                    toast.success("Item added to favorite successfully");
                  }}
                >
                  <i className="bi bi-heart-fill"></i>
                </div>

                <div
                  className={styles.cartIcon}
                  onClick={() => {
                    addToCart(p);
                    toast.success("Item added to cart successfully");
                  }}
                >
                  <i className="bi bi-cart-fill"></i>
                </div>
              </div>
              <div className={styles.productBody}>
                <h2>Name : {p.name}</h2>
                <p>Description : {p.description.substring(0, 30)}</p>
                <div>Price : ${p.price}</div>
                <button onClick={() => navigate(`/product/${p.slug}`)}>
                  See More
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className={styles.loadMoreContainer}>
        {products && products.length < total && (
          <button
            className={styles.loadMore}
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            {loading ? "Loading..." : "loadmore"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Menue;
