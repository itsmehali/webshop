import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { updateProduct, listPorductDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import FormSkeleton from "../components/FormSkeleton";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductUpdateScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [upload, setUpload] = useState(false);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const productInf = useSelector((state) => state.productDetails);
  const { product, error, loading } = productInf;

  const productEdit = useSelector((state) => state.productUpdate);

  const {
    success: successEdit,
    error: errorEdit,
    loading: loadingEdit,
  } = productEdit;

  useEffect(() => {
    if (successEdit) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (product._id !== productId || !product.name) {
        dispatch(listPorductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setDescription(product.description);
        setBrand(product.brand);
        setCount(product.count);
      }
    }
  }, [dispatch, product, successEdit, productId, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        description,
        brand,
        count,
      })
    );
  };

  const uploadHandler = async (e) => {
    const formData = new FormData();
    const image = e.target.files[0];

    formData.append("image", image);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      //setUploading(false);
    } catch (error) {
      console.error(error);
      // setUploading(false);
    }
  };

  return (
    <>
      <FormSkeleton>
        {errorEdit && <Message variant="danger">{errorEdit}</Message>}
        {loadingEdit && <Loader />}
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Open File"
                custom
                onChange={uploadHandler}
              ></Form.File>
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countInStock"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
        <Link to="/admin/productlist" className="btn btn-light my-3">
          Go Back
        </Link>
      </FormSkeleton>
    </>
  );
};

export default ProductUpdateScreen;
