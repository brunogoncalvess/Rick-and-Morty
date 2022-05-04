import { useState } from 'react';
import Modal from "react-modal/lib/components/Modal";
import { BsXLg, BsFillArrowUpCircleFill, BsGithub, BsLinkedin } from 'react-icons/bs';

import Card from './components/Card';

import './App.css';

function App() {

  if (!localStorage.characters) {      
      const charactersIdArray = [];

      for (let i = 1; i <= 826; i++) {
        charactersIdArray.push(i)
    }

    fetch(`https://rickandmortyapi.com/api/character/${charactersIdArray}`)
    .then(resp => resp.json())
    .then(resp => {
      localStorage.setItem("characters", JSON.stringify(resp))
    })
    .catch(e => console.log(e))  
  }

  const characters = JSON.parse(localStorage.characters)

  const [input, setInput] = useState(' ')

  const handleInput = (e) => {
    setInput(e.target.value.toLowerCase())
  }

  const [modalCharacter, setModalCharacter] = useState(characters[0])

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
        {characters.filter(char => char.name.toLowerCase().includes(input)).map(char => <Card key={char.id} handleModalContent={handleModalContent} character={char} openModal={openModal} />)}
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