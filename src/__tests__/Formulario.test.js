import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Formulario from "../components/Formulario"
import "@testing-library/jest-dom/extend-expect"
import userEvent from '@testing-library/user-event'

const crearCita = jest.fn()

test("<Formulario/> Cargar el formulario y revisar que todo sea correcto", () => {
    // const wrapper = render(<Formulario/>)
    // wrapper.debug()

    render(<Formulario crearCita={crearCita}/>)
    expect(screen.getByText("Crear Cita")).toBeInTheDocument()
    expect(screen.getByTestId("titulo").tagName).toBe("H2")
    expect(screen.getByTestId("titulo").tagName).not.toBe("H1")
    expect(screen.getByTestId("titulo").textContent).toBe("Crear Cita")
    expect(screen.getByTestId("btn-submit").tagName).toBe("BUTTON")
    expect(screen.getByTestId("btn-submit").textContent).toBe("Agregar Cita")
    
})

test("<Formulario/> Validacion de formulario cuando no llenen los inputs", () => {
    
    render(<Formulario crearCita={crearCita}/>)
    
    //Dar click en el botton //userEvent.click === fireEvent.click
    const btnSubmit = screen.getByTestId("btn-submit")
    fireEvent.click(btnSubmit)

    //revisar por la alerta 
    expect(screen.getByTestId("alerta").textContent).toBe("Todos los campos son obligatorios")
    expect(screen.getByTestId("alerta").textContent).not.toBe("Error al enviar")

})

test("<Formulario/> Validacion de formulario cuando llenen los inputs", () => {
    
    render(<Formulario crearCita={crearCita}/>)
    
    //llenar una parte del formulario //fireEvent (Manera vieja de hacerlo)
    fireEvent.change(screen.getByTestId("mascota"), {target: {value: "Hook"}})
    fireEvent.change(screen.getByTestId("propietario"), {target: {value: "Juan"}})

    //llenar una parte del formulario //userEvent (Manera nueva de hacerlo)
    userEvent.type(screen.getByTestId("fecha"), "2000-09-01");
    userEvent.type(screen.getByTestId("hora"), "10:30");
    userEvent.type(screen.getByTestId("sintomas"), "Solo duerme");

    //Dar click en el botton //userEvent.click === fireEvent.click
    const btnSubmit = screen.getByTestId("btn-submit")
    userEvent.click(btnSubmit)

    //verificar que no se muestre la alerta
    //Cuando puede tomar dos estados 1 - 0 se coloca query
    const alerta = screen.queryByTestId("alerta")
    expect(alerta).not.toBeInTheDocument()


    //crear cita y comprobar que la funcion se haya llamado
    expect( crearCita ).toHaveBeenCalled()
    expect( crearCita ).toHaveBeenCalledTimes(1)

})
