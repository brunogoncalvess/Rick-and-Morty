import { useEffect, useState } from 'react';
import Modal from "react-modal/lib/components/Modal";
import { BsXLg, BsFillArrowUpCircleFill, BsGithub, BsLinkedin } from 'react-icons/bs';

import Card from './components/Card';

import './App.css';

function App() {
  const charactersIdArray = [];

  for (let i = 1; i <= 826; i++) {
    charactersIdArray.push(i)
  }
  const mockupCharacter = [{
    "id": 1,
    "name": "Rick Sanchez",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Male",
    "origin": {
    "name": "Earth (C-137)",
    "url": "https://rickandmortyapi.com/api/location/1"
    },
    "location": {
    "name": "Citadel of Ricks",
    "url": "https://rickandmortyapi.com/api/location/3"
    },
    "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
  }]

  const [characters, setCharacters] = useState(mockupCharacter)

  const data = typeof localStorage.characters != 'undefined' ? JSON.parse(localStorage.characters) : 
  (async () => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/${charactersIdArray}`)
      const data = await response.json()
      localStorage.setItem("characters", JSON.stringify(data))
      return data
    } catch(e) {
      console.log('try catch error ->', e)
    }
  })()
 
  useEffect(() => {
    if (data.constructor.name === "Promise") {
      data.then(resp => setCharacters(resp))
    } else {
      setCharacters(data)
    }
  }, [])

  const [modalCharacter, setModalCharacter] = useState(characters[0])

  const [input, setInput] = useState(' ')

  const handleInput = (e) => {
    setInput(e.target.value.toLowerCase())
  }


  const handleModalContent = (id, character) => {
    setModalCharacter(character)
  }

  Modal.setAppElement('#root')
  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  return (
    <div className='container'>
      <div className='input-wrapper' >
        <input onChange={handleInput} autoFocus type="searchbar" id='searchbar' placeholder='Find a character...' /><br />
      </div>
      <a href="#">
        <BsFillArrowUpCircleFill className='button-up'/>
      </a>

      <div className='card-wrapper'>
        {
          characters.filter(char => char.name.toLowerCase().includes(input)).map(char => <Card key={char.id} handleModalContent={handleModalContent} character={char} openModal={openModal} />)          
        }
      </div>


      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal'>
            <button onClick={closeModal} className="close-button">
                <BsXLg className="close-icon"/>
            </button>
            <span><strong>Name: </strong>{modalCharacter.name}</span><br />
            <span><strong>Status: </strong>{modalCharacter.status}</span><br />
            <span><strong>Gender: </strong>{modalCharacter.gender}</span><br />
            <span><strong>Origin: </strong>{modalCharacter.origin.name}</span><br />
            <span><strong>Location: </strong> {modalCharacter.location.name}</span>
      </Modal>

      <div className='footer-wrapper'>
        <footer className='footer'>
          <div>
            <span>Made by </span><strong>Bruno Gonçalves</strong>
          </div>
          <div>
            <a href="https://github.com/brunogoncalvess/" target="_blank" rel="noreferrer">
              <BsGithub className='footer-img' />
            </a>
            <a href="https://linkedin.com/in/brunrsg" target="_blank" rel="noreferrer">
              <BsLinkedin className='footer-img'/>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;