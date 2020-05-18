import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dPartida";
import * as actionsTime  from "../actions/dTime";
import { useToasts } from "react-toast-notifications";

import styled from "styled-components";

const MeuBotao = styled.button`
    background: #0099FF;
    border: 2px solid #0099FF;
    border-radius: 3px;
    color: #FDFDFD;
    font-size: 1.2rem;
    margin: 1rem;
    padding: 1rem 1.5rem;
`;

const Salvar = styled.button`
    background: #0022FF;
    border: 2px solid #0099FF;
    border-radius: 3px;
    color: #FDFDFD;
    font-size: 1.2rem;
    margin: 1rem;
    padding: 1rem 1.5rem;
`;

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    equipeAId: '',
    equipeBId: '',
    placarA: 0,
    placarB: 0
}

const DPartidaForm = ({ classes, ...props }) => {

    useEffect(() => {
        props.fetchAllDTimes()
    }, [])//componentDidMount
    
   

    //toast msg.
    const { addToast } = useToasts()

   
    //validate()
    //validate({fullName:'jenny'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('equipeAId' in fieldValues)
            temp.equipeAId = fieldValues.equipeAId ? "" : "Campo obrigatório."
        if ('equipeBId' in fieldValues)
            temp.equipeBId = fieldValues.equipeBId ? "" : "Campo obrigatório."
        
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

   

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Partida iniciada!", { appearance: 'success' })
            }
            if (props.currentId === 0)
                props.createDPartida(values, onSuccess)
            else
                props.updateDPartida(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.dPartidaList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit} id="frmPartida">
            <Grid container>
                <Grid item xs={6}>
                   
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.equipeAId && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Primeiro Time</InputLabel>
                        <Select
                            name="equipeAId"
                            value={values.equipeAId}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                            key="1"
                        >
                            <MenuItem value="">Escolha o Primeiro Time </MenuItem>
                          
                            

                            {
                                    props.dTimeList.map((record, index) => {
                                        return (
                                           <MenuItem key={index}  value={record.id}>{record.nome}</MenuItem>
                                            )
                                    })
                                }
                        
                           
                        </Select>
                        {errors.equipeAId && <FormHelperText>{errors.equipeAId}</FormHelperText>}
                    </FormControl>
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.equipeBId && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Segundo Time</InputLabel>
                        <Select
                            name="equipeBId"
                            value={values.equipeBId}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                            key="2"
                        >
                             <MenuItem value="">Escolha o Segundo Time </MenuItem>
                            

                            {
                                    props.dTimeListB.map((record, index) => {
                                        return (
                                           <MenuItem key={index}  value={record.id}>{record.nome}</MenuItem>
                                            )
                                    })
                                }
                        
                        </Select>
                        {errors.equipeBId && <FormHelperText>{errors.equipeBId}</FormHelperText>}
                    </FormControl>
                    <TextField
                        name="placarA"
                        variant="outlined"
                        label="Placar Time 1"
                        value={values.placarA}
                        onChange={handleInputChange}
                        {...(errors.placarA && { error: true, helperText: errors.placarA })}
                    />
                    <TextField
                        name="placarB"
                        variant="outlined"
                        label="Placar TIme 2"
                        value={values.placarB}
                        onChange={handleInputChange}
                        {...(errors.placarB && { error: true, helperText: errors.placarB })}
                    />
                </Grid>
                <Grid item xs={6}>

                    
                    <div>
                        <MeuBotao type="submit">Iniciar</MeuBotao>
                        <Salvar  type="submit">Atualizar</Salvar>
                       
                    
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    dPartidaList: state.dPartida.list,
    dTimeList: state.dTime.list,
    dTimeListB: state.dTime.list
  
})

const mapActionToProps = {
    createDPartida: actions.create,
    updateDPartida: actions.update,
    fetchAllDTimes: actionsTime.fetchAll
   
    
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DPartidaForm));