import React, { useCallback, useEffect, useState } from 'react'

interface ModalContextInterface {
  setModal?: (c: any) => void
}

type ModalProps = {
  unSetModal: () => void
}

const ModalContext = React.createContext<ModalContextInterface>({})

const Modal: React.FC<ModalProps> = ({ unSetModal }) => {
  useEffect(() => {
    const bind = (e: KeyboardEvent) => {
      if (e.keyCode !== 27) {
        return
      }

      unSetModal()
    }

    document.addEventListener('keyup', bind)
    return () => document.removeEventListener('keyup', bind)
  }, [unSetModal])

  return (
    <div className="modal" onClick={unSetModal}>
      <div className="modal__inner">
        <h2>How to play?</h2>
        <p>Select a word by clicking on the first letter, dragging the mouse to the last letter, and releasing the mouse.</p>
        <ol>
          <li>Highlight order does not matter, meaning you can start from the start or the end of the word.</li>
          <li>Some words have multiple translations.</li>
        </ol>
      </div>
    </div>
  )
}

const ModalProvider: React.FC<React.PropsWithChildren>  = (props) => {
  const [modal, setModal] = useState(false)
  const unSetModal = useCallback(() => setModal(false), [setModal])

  return (
    <ModalContext.Provider value={{ setModal }} {...props} >
      {props.children}
      {modal && <Modal unSetModal={unSetModal} />}
    </ModalContext.Provider>
  )
}

const useModal = () => {
  const context = React.useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a UserProvider')
  }

  return context
}

export { ModalProvider, useModal }
