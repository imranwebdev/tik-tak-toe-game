import React, { useState } from "react";
import char from "../assets/img/char.png";
import char2 from "../assets/img/char2.png";
import { useNavigate } from 'react-router-dom';
import Game from "./game";

function UserReg() {
    const navigate = useNavigate();

    const characters = [
        { id: 1, img: char, selected: false },
        { id: 2, img: char2, selected: false }
    ];

    const [characterState, setCharacterState] = useState(characters);

    const handleCharacterClick = (id) => {
        const updatedCharacters = characterState.map((character) =>
            character.id === id
                ? { ...character, selected: true }
                : { ...character, selected: false }


        );

        setCharacterState(updatedCharacters);

    };

    const displayCharacters = characterState.map((character) => (
        <div className="character m-5" key={character.id}>
            <img
                src={character.img}
                className={
                    character.selected
                        ? "rounded-lg outline outline-offset-2 outline-green-500"
                        : "rounded-lg   outline-white"
                }
                onClick={() => handleCharacterClick(character.id)}
            />
        </div>
    ));

    return (
        <>
            <form>
                <div className="w-5/6 md:w-1/3  h-fit pb-20 bg-customBlue absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="char-select flex items-center justify-center mt-20  ">
                        {displayCharacters}
                    </div>
                    <h1 className="text-3xl font-medium text-white">choose character</h1>
                    <input type="text"placeholder="your name" className="bg-white mt-5 p-1 text-center text-xl text-blue-700 font-medium w-4/5" required />
                    <br></br>
                    <button
                        className="bg-customBlueLight mt-2 text-center text-2xl text-white font-semibold  w-4/5 p-1 hover:bg-customBlueLight active:bg-customBlueLight focus:outline-none focus:ring focus:bg-customBlue"
                        onClick={() => {
                            const selectedCharacter = characterState.find((character) => character.selected);
                            if (selectedCharacter) {
                                navigate('/game', {
                                    state: {
                                        img: selectedCharacter.img,
                                        name: document.querySelector("input").value,
                                    }
                                });
                            }else{
                                alert("select character")
                            }
                        }}
                    >
                        submit
                    </button>


                </div>
            </form>

        </>
    );
}

export default UserReg;
