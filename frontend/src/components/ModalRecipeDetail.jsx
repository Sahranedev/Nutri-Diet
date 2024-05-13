/* eslint-disable no-shadow */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-self-compare */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import useLocalStorage from "./LocalStorage/UseLocalStorage";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ModalRecipeDetails({ item, open, handleClose }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [isFilled, setIsFilled] = useState(false);
  const [favouriteRecipes, setFavouriteRecipes] = useLocalStorage(
    "favouriteRecipes",
    []
  );
  const handleClick = () => {
    setIsFilled(!isFilled);

    if (!isFilled) {
      setFavouriteRecipes([...favouriteRecipes, item]);
    } else {
      setFavouriteRecipes(
        favouriteRecipes.filter((recipes) => recipes.uri !== recipes.uri)
      );
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className="absolute top-1/2 left-1/2 w-[90vw] transform -translate-x-1/2
           -translate-y-1/2 h-[90vh] md:w-[80vw] md:h-[94vh]
           border-2  shadow-md block md:flex bg-white"
        >
          <img
            className=" w-full h-[30vh] md:w-[100vw] md:mx-5 md:h-[60vh] my-auto rounded-lg shadow-md"
            src={item.image}
            alt=""
          />
          <div className=" w-full md:border-l border-black  md:flex flex-col md:mx-auto md:min-w-[30vw]">
            <h3 className="text-xl w-full text-bold md:text-3xl py-4 text-center">
              {item.label}
            </h3>
            <hr />
            <div className="flex md:px-1 justify-center py-3 md:py-5 border-y border-black">
              <p className="md:border-r md:border-black px-1 md:px-0  md:pr-6 md:uppercase">
                🍴 {item.mealType}
              </p>
              <p className="md:border-r md:border-black px-1 md:px-0 md:pr-6 md:uppercase">
                🌎 {item.cuisineType}
              </p>
              <p>🕝 {item.totalTime}min</p>
            </div>
            <hr />
            <div className="min-h-[30vh] md:min-h-[55vh] border-b border-black ">
              <Box>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <Tabs
                    sx={{ margin: "0 auto" }}
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                      }}
                      label="Ingredients"
                      {...a11yProps(0)}
                    />
                    <Tab
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 700,
                      }}
                      label="Total Nutrients"
                      {...a11yProps(1)}
                    />
                  </Tabs>
                </Box>
                <TabPanel component="div" value={value} index={0}>
                  <ul className="max-h-[19vh] md:max-h-[40vh] overflow-auto">
                    {item.ingredients.map((itemIngredient) => (
                      <li className="flex my-1 ">
                        <img
                          className="h-6 rounded-md mr-2 "
                          src={itemIngredient.image}
                          alt=""
                        />
                        <li>{itemIngredient.text}</li>
                      </li>
                    ))}
                  </ul>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <div className="max-h-[19vh] md:max-h-[40vh] overflow-auto ">
                    <h2 className="text-orange-500 text-xl">
                      {item.totalNutrients.FAT.label}
                    </h2>
                    <div className="pl-4">
                      <div className="flex">
                        <p className="p-1">{item.totalNutrients.FAPU.label}</p>
                        <p className="p-1">{`${
                          (item.totalNutrients.FAPU.quantity * 100).toFixed(0) /
                          100
                        }`}</p>
                        <p className="p-1">{item.totalNutrients.FAPU.unit}</p>
                      </div>
                      <div className="flex">
                        <p className="p-1">{item.totalNutrients.FASAT.label}</p>
                        <p className="p-1">{`${
                          (item.totalNutrients.FASAT.quantity * 100).toFixed(
                            0
                          ) / 100
                        }`}</p>
                        <p className="p-1">{item.totalNutrients.FASAT.unit}</p>
                      </div>
                      <div className="flex">
                        <p className="p-1">{item.totalNutrients.FAMS.label}</p>
                        <p className="p-1">{`${
                          (item.totalNutrients.FAMS.quantity * 100).toFixed(0) /
                          100
                        }`}</p>
                        <p className="p-1">{item.totalNutrients.FAMS.unit}</p>
                      </div>
                      {/* <div className="flex">
                        <p className="p-1">{`${
                          (item.totalNutrients.FATRN.quantity * 100).toFixed(
                            0
                          ) / 100
                        }`}</p>
                        <p className="p-1">{item.totalNutrients.FATRN.unit}</p>
                      </div> */}
                    </div>
                    <h2 className="text-orange-500 text-xl">
                      {item.totalNutrients.PROCNT.label}
                    </h2>
                    <div className="pl-4">
                      <div className="flex">
                        <p className="p-1">{item.totalNutrients.CHOLE.label}</p>
                        <p className="p-1">{`${
                          (item.totalNutrients.CHOLE.quantity * 100).toFixed(
                            0
                          ) / 100
                        }`}</p>
                        <p className="p-1">{item.totalNutrients.CHOLE.unit}</p>
                      </div>
                      <div className="flex">
                        <p className="p-1">{item.totalNutrients.NA.label}</p>
                        <p className="p-1">{`${
                          (item.totalNutrients.NA.quantity * 100).toFixed(0) /
                          100
                        }`}</p>
                        <p className="p-1">{item.totalNutrients.NA.unit}</p>
                      </div>
                      <div className="flex">
                        <p className="p-1">{item.totalNutrients.CA.label}</p>
                        <p className="p-1">{`${
                          (item.totalNutrients.CA.quantity * 100).toFixed(0) /
                          100
                        }`}</p>
                        <p className="p-1">{item.totalNutrients.CA.unit}</p>
                      </div>
                      <div className="flex">
                        <p className="p-1">{item.totalNutrients.MG.label}</p>
                        <p className="p-1">{`${
                          (item.totalNutrients.MG.quantity * 100).toFixed(0) /
                          100
                        }`}</p>
                        <p className="p-1">{item.totalNutrients.MG.unit}</p>
                      </div>
                      <div className="flex">
                        <p className="p-1">{item.totalNutrients.K.label}</p>
                        <p className="p-1">{`${
                          (item.totalNutrients.K.quantity * 100).toFixed(0) /
                          100
                        }`}</p>
                        <p className="p-1">{item.totalNutrients.K.unit}</p>
                      </div>
                    </div>
                  </div>
                </TabPanel>
              </Box>
            </div>
            <div className="flex pt-5 md:pt-0 justify-center my-auto">
              <IconButton
                onClick={handleClick}
                color={isFilled ? "error" : "inherit"}
                disableRipple
              >
                {isFilled ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <button
                className="bg-red-500  hover:bg-red-700 text-white font-bold mx-5 px-5 rounded"
                type="button"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalRecipeDetails;
