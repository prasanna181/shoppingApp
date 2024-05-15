import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Men.css";
import Carousel from "react-bootstrap/Carousel";
// import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import Loader from "../Loader/loader";
import Accordion from "react-bootstrap/Accordion";
// import { API } from '../Api/Api.js'
import { Link } from "react-router-dom";
import Slider from "@mui/material/Slider";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faEye,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

import { DataContext } from "../context/DataProvider.jsx";
import { BASEURL } from "../../BASEURL";

const MenImages = require.context("../../Images/Men");
const ProductImages = require.context("../../Images/display");

var AllData = {
  brands: [],
  size: [],
  categories: [],
  color: [],
  price: [0, 20000],
};

///// n apis

const Menvalues = () => {
  console.log("hello from men api............");
  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/Men`)
      .then((res) => {
        if (!res.ok) throw Error("Internal Server Error");
        return res.json();
      })
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
  return promise;
};

//get alluniquedata
const AllUniqueData = () => {
  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/getAllUniqueData`)
      .then((res) => {
        if (!res.ok) throw Error("Internal Server Error");
        return res.json();
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
};

/// posting  views data to database

const IncreaseViewProduct = (selectProduct) => {
  // const data = signup;

  const datastring = `id:${selectProduct._id}`;
  const promise = new Promise((resolve, reject) => {
    fetch(`${BASEURL}/increaseViewProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(datastring),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data);
        // togglesignup('login');
        // setsignup(signupintialvalues);
        // setError('');
      })
      .catch((error) => {
        reject(error);
        // setError('something went wrong! please try again later');
      });
  });
  return promise;
};

export default function Men() {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState("");
  const [uniqueData, setUniqueData] = React.useState({
    Brands: [],
    Categories: [],
  });
  const [colorData, setColorData] = React.useState({ color: "red" });
  const [sizeData, setSizeData] = React.useState({ size: "1" });
  const [priceFilter, setPriceFilter] = React.useState([]);
  const [filterSize, setFilterSize] = React.useState([]);
  const [filterBrands, setFilterBrands] = React.useState([]);
  const [filterCategories, setFilterCategories] = React.useState([]);
  const [filterColor, setFilterColor] = React.useState([]);

  const { backgroundColor } = React.useContext(DataContext);

  // const []
  function FreqCount(d) {
    const counts = {};
    d.map((ele) => {
      for (const num of ele.Size) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }
    });

    return counts;
  }
  //for count color data
  function FreqCountColor(d) {
    const counts = {};
    d.map((ele) => {
      for (const num of ele.Color) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
      }
    });

    return counts;
  }

  React.useEffect(() => {
    Menvalues()
      .then((res) => {
        setData(res.data);
        setColorData(FreqCountColor(res.data));
        setSizeData(FreqCount(res.data));
      })
      .then((error) => {
        setError(error);
      });
    AllUniqueData()
      .then((res) => {
        setUniqueData(res.data);
      })
      .then((error) => {
        setError(error);
      });

    // filterData();
  }, []);

  function findFilterSize(a, b) {
    console.log("arr", a, b);
    var flag = false;
    b.forEach((ele) => {
      a.forEach((aele) => {
        console.log(aele, ele, aele === ele);
        if (aele === ele) {
          flag = true;
          return flag;
        }
      });
    });
    return flag;
  }
  function findBrandsEle(a, arr) {
    var flag = false;
    arr.forEach((ele) => {
      if (ele === a) {
        flag = true;
        return true;
      }
    });
    return flag;
  }
  const filterData = () => {
    setPriceFilter([AllData.price[0], AllData.price[1]]);
    setFilterSize(AllData.size);
    setFilterBrands(AllData.brands);
    setFilterCategories(AllData.categories);
    setFilterColor(AllData.color);
  };

  // filter function starts

  var t = data.filter((event) => {
    if (
      priceFilter.length === 0 &&
      filterSize.length === 0 &&
      filterBrands.length === 0 &&
      filterCategories.length === 0 &&
      filterColor.length === 0
    ) {
      return true;
    }
    if (priceFilter.length === 0) {
      if (
        filterSize.length !== 0 &&
        filterBrands.length === 0 &&
        filterCategories.length === 0 &&
        filterColor.length === 0
      ) {
        return findFilterSize(event.Size, filterSize);
      }
      if (
        filterBrands.length !== 0 &&
        filterSize.length === 0 &&
        filterCategories.length === 0 &&
        filterColor.length === 0
      ) {
        return findBrandsEle(event.Brands, filterBrands);
      }
      if (
        filterCategories.length !== 0 &&
        filterSize.length === 0 &&
        filterBrands.length === 0 &&
        filterColor.length === 0
      ) {
        return findBrandsEle(event.Category, filterCategories);
      }
      if (
        filterColor.length !== 0 &&
        filterSize.length === 0 &&
        filterBrands.length === 0 &&
        filterCategories.length === 0
      ) {
        return findFilterSize(event.Color, filterColor);
      }
      //two
      if (
        filterSize.length !== 0 &&
        filterBrands.length !== 0 &&
        filterCategories.length === 0 &&
        filterColor.length === 0
      ) {
        return (
          findFilterSize(event.Size, filterSize) &&
          findBrandsEle(event.Brands, filterBrands)
        );
      }
      if (
        filterSize.length !== 0 &&
        filterBrands.length === 0 &&
        filterCategories.length !== 0 &&
        filterColor.length === 0
      ) {
        return (
          findFilterSize(event.Size, filterSize) &&
          findBrandsEle(event.Category, filterCategories)
        );
      }
      if (
        filterSize.length !== 0 &&
        filterBrands.length === 0 &&
        filterCategories.length === 0 &&
        filterColor.length !== 0
      ) {
        return (
          findFilterSize(event.Size, filterSize) &&
          findFilterSize(event.Color, filterColor)
        );
      }

      if (
        filterSize.length === 0 &&
        filterBrands.length !== 0 &&
        filterCategories.length !== 0 &&
        filterColor.length === 0
      ) {
        return (
          findBrandsEle(event.Brands, filterBrands) &&
          findBrandsEle(event.Category, filterCategories)
        );
      }
      if (
        filterSize.length === 0 &&
        filterBrands.length !== 0 &&
        filterCategories.length === 0 &&
        filterColor.length !== 0
      ) {
        return (
          findBrandsEle(event.Brands, filterBrands) &&
          findFilterSize(event.Color, filterColor)
        );
      }
      if (
        filterSize.length === 0 &&
        filterBrands.length === 0 &&
        filterCategories.length !== 0 &&
        filterColor.length !== 0
      ) {
        return (
          findBrandsEle(event.Category, filterCategories) &&
          findFilterSize(event.Color, filterColor)
        );
      }

      //three searching
      //size
      if (
        filterSize.length !== 0 &&
        filterBrands.length !== 0 &&
        filterCategories.length !== 0 &&
        filterColor.length === 0
      ) {
        return (
          findFilterSize(event.Size, filterSize) &&
          findBrandsEle(event.Brands, filterBrands) &&
          findBrandsEle(event.Category, filterCategories)
        );
      }

      if (
        filterSize.length !== 0 &&
        filterBrands.length !== 0 &&
        filterCategories.length === 0 &&
        filterColor.length !== 0
      ) {
        return (
          findFilterSize(event.Size, filterSize) &&
          findBrandsEle(event.Brands, filterBrands) &&
          findFilterSize(event.Color, filterColor)
        );
      }
      //brands
      if (
        filterSize.length === 0 &&
        filterBrands.length !== 0 &&
        filterCategories.length !== 0 &&
        filterColor.length !== 0
      ) {
        return (
          findBrandsEle(event.Brands, filterBrands) &&
          findBrandsEle(event.Category, filterCategories) &&
          findFilterSize(event.Color, filterColor)
        );
      }
      if (
        filterSize.length !== 0 &&
        filterBrands.length === 0 &&
        filterCategories.length !== 0 &&
        filterColor.length !== 0
      ) {
        return (
          findFilterSize(event.Size, filterSize) &&
          findBrandsEle(event.Category, filterCategories) &&
          findFilterSize(event.Color, filterColor)
        );
      }
      if (
        filterSize.length !== 0 &&
        filterBrands.length !== 0 &&
        filterCategories.length !== 0 &&
        filterColor.length !== 0
      ) {
        return (
          findFilterSize(event.Size, filterSize) &&
          findBrandsEle(event.Brands, filterBrands) &&
          findBrandsEle(event.Category, filterCategories) &&
          findFilterSize(event.Color, filterColor)
        );
      }
    }
    if (priceFilter.length !== 0) {
      if (
        filterSize.length !== 0 &&
        filterBrands.length === 0 &&
        filterCategories.length === 0 &&
        filterColor.length === 0
      ) {
        return (
          findFilterSize(event.Size, filterSize) &&
          event.Price >= priceFilter[0] &&
          event.Price <= priceFilter[1]
        );
      }
      if (
        filterBrands.length !== 0 &&
        filterSize.length === 0 &&
        filterCategories.length === 0 &&
        filterColor.length === 0
      ) {
        return (
          findBrandsEle(event.Brands, filterBrands) &&
          event.Price >= priceFilter[0] &&
          event.Price <= priceFilter[1]
        );
      }
      if (
        filterCategories.length !== 0 &&
        filterSize.length === 0 &&
        filterBrands.length === 0 &&
        filterColor.length === 0
      ) {
        return (
          findBrandsEle(event.Category, filterCategories) &&
          event.Price >= priceFilter[0] &&
          event.Price <= priceFilter[1]
        );
      }
      if (
        filterColor.length !== 0 &&
        filterSize.length === 0 &&
        filterBrands.length === 0 &&
        filterCategories.length === 0
      ) {
        return (
          findFilterSize(event.Color, filterColor) &&
          event.Price >= priceFilter[0] &&
          event.Price <= priceFilter[1]
        );
      }
      //two
      if (
        filterSize.length !== 0 &&
        filterBrands.length !== 0 &&
        filterCategories.length === 0 &&
        filterColor.length === 0
      ) {
        return (
          findFilterSize(event.Size, filterSize) &&
          findBrandsEle(event.Brands, filterBrands) &&
          event.Price >= priceFilter[0] &&
          event.Price <= priceFilter[1]
        );
      }
      if (
        filterSize.length !== 0 &&
        filterBrands.length === 0 &&
        filterCategories.length !== 0 &&
        filterColor.length === 0
      ) {
        return (
          findFilterSize(event.Size, filterSize) &&
          findBrandsEle(event.Category, filterCategories) &&
          event.Price >= priceFilter[0] &&
          event.Price <= priceFilter[1]
        );
      }
      if (
        filterSize.length !== 0 &&
        filterBrands.length === 0 &&
        filterCategories.length === 0 &&
        filterColor.length !== 0
      ) {
        return (
          findFilterSize(event.Size, filterSize) &&
          findFilterSize(event.Color, filterColor) &&
          event.Price >= priceFilter[0] &&
          event.Price <= priceFilter[1]
        );
      }

      if (
        filterSize.length === 0 &&
        filterBrands.length !== 0 &&
        filterCategories.length !== 0 &&
        filterColor.length === 0
      ) {
        return (
          findBrandsEle(event.Brands, filterBrands) &&
          findBrandsEle(event.Category, filterCategories) &&
          event.Price >= priceFilter[0] &&
          event.Price <= priceFilter[1]
        );
      }
      if (
        filterSize.length === 0 &&
        filterBrands.length !== 0 &&
        filterCategories.length === 0 &&
        filterColor.length !== 0
      ) {
        return (
          findBrandsEle(event.Brands, filterBrands) &&
          findFilterSize(event.Color, filterColor) &&
          event.Price >= priceFilter[0] &&
          event.Price <= priceFilter[1]
        );
      }
      if (
        filterSize.length === 0 &&
        filterBrands.length === 0 &&
        filterCategories.length !== 0 &&
        filterColor.length !== 0
      ) {
        return (
          findBrandsEle(event.Category, filterCategories) &&
          findFilterSize(event.Color, filterColor) &&
          event.Price >= priceFilter[0] &&
          event.Price <= priceFilter[1]
        );
      }

      //three searching
      //size
      if (
        filterSize.length !== 0 &&
        filterBrands.length !== 0 &&
        filterCategories.length !== 0 &&
        filterColor.length === 0
      ) {
        return (
          findFilterSize(event.Size, filterSize) &&
          findBrandsEle(event.Brands, filterBrands) &&
          findBrandsEle(event.Category, filterCategories) &&
          event.Price >= priceFilter[0] &&
          event.Price <= priceFilter[1]
        );
      }

      if (
        filterSize.length !== 0 &&
        filterBrands.length !== 0 &&
        filterCategories.length === 0 &&
        filterColor.length !== 0
      ) {
        return (
          findFilterSize(event.Size, filterSize) &&
          findBrandsEle(event.Brands, filterBrands) &&
          findFilterSize(event.Color, filterColor) &&
          event.Price >= priceFilter[0] &&
          event.Price <= priceFilter[1]
        );
      }
      //brands
      if (
        filterSize.length === 0 &&
        filterBrands.length !== 0 &&
        filterCategories.length !== 0 &&
        filterColor.length !== 0
      ) {
        return (
          findBrandsEle(event.Brands, filterBrands) &&
          findBrandsEle(event.Category, filterCategories) &&
          findFilterSize(event.Color, filterColor) &&
          event.Price >= priceFilter[0] &&
          event.Price <= priceFilter[1]
        );
      }
      if (
        filterSize.length !== 0 &&
        filterBrands.length === 0 &&
        filterCategories.length !== 0 &&
        filterColor.length !== 0
      ) {
        return (
          findFilterSize(event.Size, filterSize) &&
          findBrandsEle(event.Category, filterCategories) &&
          findFilterSize(event.Color, filterColor) &&
          event.Price >= priceFilter[0] &&
          event.Price <= priceFilter[1]
        );
      }
      if (
        filterSize.length !== 0 &&
        filterBrands.length !== 0 &&
        filterCategories.length !== 0 &&
        filterColor.length !== 0
      ) {
        return (
          findFilterSize(event.Size, filterSize) &&
          findBrandsEle(event.Brands, filterBrands) &&
          findBrandsEle(event.Category, filterCategories) &&
          findFilterSize(event.Color, filterColor) &&
          event.Price >= priceFilter[0] &&
          event.Price <= priceFilter[1]
        );
      }
    }
    return event.Price >= priceFilter[0] && event.Price <= priceFilter[1];
  });
  // filter function ends

  const [mobileScreenFilterButton, setMobileScreenFilterButton] =
    React.useState(false);

  return (
    <div
      style={{
        background: `${backgroundColor.background}`,
        color: `${backgroundColor.color}`,
      }}
      className="Main_container"
    >
      <Container>
        <Row className="Main_row">
          {
            <Col xs lg="3" className="FilterCol">
              {/* input filtering */}
              <Filter
                uniqueData={uniqueData}
                sizeData={sizeData}
                filterData={filterData}
                colorData={colorData}
              />
            </Col>
          }
          {mobileScreenFilterButton && (
            <Col
              className="forMobile"
              style={{ display: "initial", position: "relative", top: "4rem" }}
            >
              <Filter
                uniqueData={uniqueData}
                sizeData={sizeData}
                filterData={filterData}
                colorData={colorData}
              />
            </Col>
          )}
          {!mobileScreenFilterButton && (
            <Col className="products">
              {t && <Products data={t} />}
              {t.length === 0 && <Loader />}
            </Col>
          )}
        </Row>
        <Row>
          <button
            style={{ width: "fit-content" }}
            className="filterButton"
            onClick={() => {
              setMobileScreenFilterButton(!mobileScreenFilterButton);
            }}
          >
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </Row>
      </Container>
    </div>
  );
}
// Men function ends here

// discount Calculate function
const discountamount = (discount, original) => {
  let amount = original * (discount / 100);
  amount = Math.round(amount);
  return original - amount;
};

//Fliter Component Function (LEFT Take user input and filter)
const Filter = ({ uniqueData, sizeData, filterData, colorData }) => {
  return (
    <div>
      <Categories uniqueData={uniqueData} filterData={filterData} />
      <Brands uniqueData={uniqueData} filterData={filterData} />
      <Price filterData={filterData} />
      <Size sizeData={sizeData} filterData={filterData} />
      <Color colorData={colorData} filterData={filterData} />
    </div>
  );
};
//Categories Component start
const Categories = ({ uniqueData, filterData }) => {
  //Handle user change in Categories
  const handleChange = (ev) => {
    var flag = false;
    var removeI = -1;
    AllData["categories"].forEach((ele, i) => {
      if (ele === ev.target.value) {
        flag = true; //check if it is already click or not
        removeI = i; // find Index
      }
    });
    if (flag) {
      // delete AllData["brands"][removeI];
      var len = AllData["categories"].length;
      var temp = AllData["categories"][len - 1];
      AllData["categories"][len - 1] = AllData["categories"][removeI];
      AllData["categories"][removeI] = temp;
      AllData["categories"].pop();
    } else {
      AllData["categories"].push(ev.target.value);
    }

    filterData();
  };
  return (
    <div>
      <fieldset>
        <legend style={{ margin: "0px" }}>Categories</legend>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Topwear</Accordion.Header>
            <Accordion.Body>
              {uniqueData.Categories.map((data, index) => {
                return (
                  <div>
                    {data._id[0] === "Topwear" && (
                      <div className="categories-container">
                        <label className="BrandsLabel">
                          {data._id[1]}({data.counter})
                        </label>
                        <input
                          value={data._id[1]}
                          onChange={handleChange}
                          className="BrandInput"
                          type="checkbox"
                          name="Sweatshirts"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Bottom wear</Accordion.Header>
            <Accordion.Body>
              {uniqueData.Categories.map((data, index) => {
                return (
                  <div>
                    {data._id[0] === "Bottomwear" && (
                      <div className="categories-container">
                        <label for="casualShirts" className="BrandsLabel">
                          {data._id[1]}({data.counter})
                        </label>
                        <input
                          className="BrandInput"
                          value={data._id[1]}
                          onChange={handleChange}
                          type="checkbox"
                          name="casualShirts"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Foot wear</Accordion.Header>
            <Accordion.Body>
              {uniqueData.Categories.map((data, index) => {
                return (
                  <div>
                    {data._id[0] === "Footwear" && (
                      <div className="categories-container">
                        <label for="casualShirts" className="BrandsLabel">
                          {data._id[1]}({data.counter})
                        </label>
                        <input
                          className="BrandInput"
                          value={data._id[1]}
                          onChange={handleChange}
                          type="checkbox"
                          name="casualShirts"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Watches</Accordion.Header>
            <Accordion.Body>
              {uniqueData.Categories.map((data, index) => {
                return (
                  <div>
                    {data._id[0] === "Watches" && (
                      <div className="categories-container">
                        <label for="casualShirts" className="BrandsLabel">
                          {data._id[1]}({data.counter})
                        </label>
                        <input
                          className="BrandInput"
                          value={data._id[1]}
                          type="checkbox"
                          name="casualShirts"
                          onChange={handleChange}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </fieldset>
    </div>
  );
};

const Brands = ({ uniqueData, filterData }) => {
  const [searchWhat, setSearchWhat] = React.useState("");

  const handleChange = (ev) => {
    var flag = false;
    var removeI = -1;
    AllData["brands"].forEach((ele, i) => {
      if (ele === ev.target.value) {
        flag = true;
        removeI = i;
      }
    });
    if (flag) {
      // delete AllData["brands"][removeI];
      var len = AllData["brands"].length;
      var temp = AllData["brands"][len - 1];
      AllData["brands"][len - 1] = AllData["brands"][removeI];
      AllData["brands"][removeI] = temp;
      AllData["brands"].pop();
    } else {
      AllData["brands"].push(ev.target.value);
    }

    filterData();
  };
  // console.log(uniqueData)
  const SearchFilterData = uniqueData.Brands.filter((ele) => {
    if (searchWhat === "") return true;
    return ele._id.toLocaleLowerCase().includes(searchWhat.toLocaleLowerCase());
  });
  return (
    <div className="brands-main Brands-container">
      <fieldset>
        <legend>Brands</legend>
        <Container className="">
          <Row className="BrandsEachRow">
            {" "}
            <input
              placeholder="Search Brands"
              className="searchboxBrands"
              value={searchWhat}
              onChange={(e) => {
                setSearchWhat(e.target.value);
              }}
            />
          </Row>
          {SearchFilterData.map((data, index) => {
            return (
              <Row className="BrandsEachRow">
                <Col>
                  <label>
                    {data._id}({data.counter})
                  </label>
                </Col>
                <Col xs lg="3">
                  <input
                    className="Brands-checkbox"
                    type="checkbox"
                    value={data._id}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            );
          })}
        </Container>
      </fieldset>
    </div>
  );
};

const Products = ({ data }) => {
  // filterData();
  const { recentView, setRecentView } = React.useContext(DataContext);

  const selectProduct = (data) => {
    IncreaseViewProduct(data);

    //recent View addded!
    var filterRecent = [];
    if (recentView) {
      filterRecent = recentView.filter((item) => {
        return item._id !== data._id;
      });

      if (filterRecent.length >= 9) {
        filterRecent.pop();
      }
    }
    if (filterRecent.length === 0) {
      filterRecent.push(data);
    } else {
      filterRecent.unshift(data);
    }
    setRecentView(filterRecent);
    localStorage.setItem("recentView_online", JSON.stringify(filterRecent));
  };

  return (
    <div
      className="styleproducts"
      style={{
        display: "flex",
        "flex-wrap": "wrap",
        justifyContent: "flex-start",
        margin: "10px",
        "justify-content": "center",
      }}
    >
      {data.map((d) => {
        return (
          <div className="product-map-container">
            <Link // <-- use Link component
              to={`/Display/${d._id}`}
              onClick={() => {
                selectProduct(d);
              }}
              state={d} // <-- pass item object in state
              className="LinkCSS"
            >
              <Card className="Card-Container" style={{ borderRadius: "30px" }}>
                <Card.Img
                  style={{ height: "16rem", borderRadius: "16px" }}
                  variant="top"
                  src={ProductImages(`./${d.Image[0]}`)}
                />
                <Card.Body>
                  <div className="BrandName">{d.Category}</div>
                  <div className="category">{d.Brands} </div>
                  <hr />
                  <Card.Text>
                    <div>
                      ₹
                      <span className="discountPrice">
                        {discountamount(d.Discount, d.Price)}
                      </span>{" "}
                      <del className="originalPrice">{d.Price}</del>
                      <span className="discount">{d.Discount}%</span>
                    </div>
                    <span>
                      {d.Size.map((t) => {
                        return (
                          <span>
                            <span>{t} </span>
                          </span>
                        );
                      })}
                    </span>
                    <div>
                      {d.Color.map((c) => {
                        return (
                          <div
                            style={{
                              display: "inline-block",
                              width: "20px",
                              margin: "5px",
                            }}
                          >
                            {
                              <strong
                                style={{
                                  background: `${c}`,
                                  display: "inline-block",
                                  width: "20px",
                                }}
                                className="colorProduct"
                              ></strong>
                            }
                          </div>
                        );
                      })}
                      <span className="views">
                        <FontAwesomeIcon icon={faEye} />{" "}
                        {d.Views > 1000 ? d.Views / 1000 : d.Views}
                        <span className="shopingCart">
                          <FontAwesomeIcon icon={faShoppingCart} />
                        </span>
                      </span>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
const Price = ({ filterData }) => {
  const [value, setValue] = React.useState([5000, 15000]);

  // Changing State when volume increases/decreases

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
  };

  const onclickapply = () => {
    AllData["price"] = value;
    filterData();
  };

  return (
    <div className="Size-Container">
      <fieldset>
        <legend>Price</legend>
        <div className="Price-Box">
          <div className="range-slider">Select Price Range:</div>
          <div className="rangeShow">
            <div className="minRange">{value[0]}</div>
            <div style={{ fontSize: "30px", height: "10px" }}>-</div>
            <div className="maxRange">{value[1]}</div>
            <div>
              <button className="priceApply" onClick={onclickapply}>
                APPLY
              </button>
            </div>
          </div>
          <Slider
            max={20000}
            value={value}
            style={{ color: "black" }}
            onChange={rangeSelector}
            valueLabelDisplay="auto"
          />
        </div>
      </fieldset>
    </div>
  );
};
const Size = ({ sizeData, filterData }) => {
  const [searchWhat, setSearchWhat] = React.useState("");
  const handleChange = (ev) => {
    var flag = false;
    var removeI = -1;
    AllData["size"].forEach((ele, i) => {
      if (ele === ev.target.value) {
        flag = true;
        removeI = i;
      }
    });
    if (flag) {
      // delete AllData["brands"][removeI];
      var len = AllData["size"].length;
      var temp = AllData["size"][len - 1];
      AllData["size"][len - 1] = AllData["size"][removeI];
      AllData["size"][removeI] = temp;
      AllData["size"].pop();
    } else {
      AllData["size"].push(ev.target.value);
    }
    filterData();
  };
  const filterSearchData = Object.entries(sizeData).filter((ele) => {
    if (searchWhat === "") return true;

    return ele[0].toLocaleLowerCase().includes(searchWhat.toLocaleLowerCase());
  });
  return (
    <div className="Size-Container ">
      <fieldset>
        <legend>Size</legend>
        <Container className="sizeInputBox">
          <Row className="sizeInputRow">
            <input
              placeholder="Search Size"
              className="searchboxSize"
              value={searchWhat}
              onChange={(e) => {
                setSearchWhat(e.target.value);
              }}
            />
          </Row>
          {filterSearchData.map(([key, value], i) => {
            return (
              <Row className="sizeInputRow">
                <Col className="ValueSize">
                  {" "}
                  <label>
                    {key}({value})
                  </label>
                </Col>
                <Col xs lg="3">
                  <input type="checkbox" value={key} onChange={handleChange} />
                </Col>
              </Row>
            );
          })}
        </Container>
      </fieldset>
    </div>
  );
};
const Color = ({ colorData, filterData }) => {
  const [searchWhat, setSearchWhat] = React.useState("");
  const handleChange = (ev) => {
    var flag = false;
    var removeI = -1;
    AllData["color"].forEach((ele, i) => {
      if (ele === ev.target.value) {
        flag = true;
        removeI = i;
      }
    });
    if (flag) {
      // delete AllData["brands"][removeI];
      var len = AllData["color"].length;
      var temp = AllData["color"][len - 1];
      AllData["color"][len - 1] = AllData["color"][removeI];
      AllData["color"][removeI] = temp;
      AllData["color"].pop();
    } else {
      AllData["color"].push(ev.target.value);
    }
    filterData();
  };
  const filterSearchData = Object.entries(colorData).filter((ele) => {
    if (searchWhat === "") return true;

    return ele[0].toLocaleLowerCase().includes(searchWhat.toLocaleLowerCase());
  });
  return (
    <div className="Size-Container ">
      <fieldset>
        <legend>Color</legend>
        <Container className="sizeInputBox">
          <Row className="sizeInputRow">
            <input
              placeholder="Search Color"
              className="searchboxSize"
              value={searchWhat}
              onChange={(e) => {
                setSearchWhat(e.target.value);
              }}
            />
          </Row>
          {filterSearchData.map(([key, value], i) => {
            return (
              <Row className="sizeInputRow">
                <Col className="ValueSize">
                  <strong
                    style={{ display: "inline-block", background: `${key}` }}
                    className="colorShow"
                  ></strong>
                  <label>
                    {key} ({value})
                  </label>
                </Col>
                <Col xs lg="3">
                  <input type="checkbox" value={key} onChange={handleChange} />
                </Col>
              </Row>
            );
          })}
        </Container>
      </fieldset>
    </div>
  );
};
