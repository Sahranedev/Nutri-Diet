import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import logoRecette from "../../assets/logoRecette.png";
import RecipePDFGenerator from "./RecipePDFGenerator";

const { VITE_BACKEND_URL } = import.meta.env;

function ModalMyRecipeDetails({ recipe, open, handleClose }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          class="absolute top-1/2 left-1/2 w-[90vw] transform -translate-x-1/2
           -translate-y-1/2 md:w-[1000px] md:h-[600px]
          bg-white border-2  shadow-md block md:flex"
        >
          <img
            className=" w-full md:w-[496px] md:h-[596px]"
            src={`${VITE_BACKEND_URL}/uploads/${recipe.image}`}
            alt=""
          />
          <div className="md:flex mx-auto flex-col">
            <div className="flex justify-between">
              <img className="h-40 w-40" src={logoRecette} alt="" />
              <RecipePDFGenerator recipe={recipe} />
            </div>

            <h3 className="text-xl w-full text-bold md:text-3xl pb-4 text-center">
              {recipe.name}
            </h3>
            <h3 className="text-center mb-2">{recipe.description}</h3>
            <hr />
            <div className="flex py-2 justify-around md:py-5">
              <p>🍴 {recipe.mealType}</p>
              <p>🌎 {recipe.cuisineType}</p>
              <p>🕝 {recipe.cook_time}</p>
            </div>
            <hr />
            <h3 className="w-full text-2xl pb-4 text-center">Ingredients</h3>
            <hr className=" pb-2 w-1/2 mx-auto" />
            {/* <ul className="h-32  md:h-auto overflow-auto">
              {recipe.ingredients.map((item) => (
                <li className="flex my-1 ">
                  <img
                    className="h-6 rounded-md mr-2 "
                    src={item.image}
                    alt=""
                  />
                  <p>{item.text}</p>
                </li>
              ))}
            </ul> */}
            <h3 className="w-full text-2xl pb-4 text-center">Instructions</h3>
            <div className="px-10 overflow-auto">
              <p>{recipe.instructions}</p>
            </div>
            <button type="button" onClick={() => console.warn("coucou")}>
              Supprimer
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalMyRecipeDetails;
