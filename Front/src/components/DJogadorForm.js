import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dJogador";
import { useToasts } from "react-toast-notifications";
import * as actionsTime  from "../actions/dTime";

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
    nome: '',
    equipeId: 0
}

const DJogadorForm = ({ classes, ...props }) => {

    
    useEffect(() => {
        props.fetchAllDTimes()
    }, [])//componentDidMount
    

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nome' in fieldValues)
            temp.jogador = fieldValues.nome ? "" : "This field is required."
        if ('equipeId' in fieldValues)
            temp.equipeId = fieldValues.equipeId ? "" : "This field is required."
        
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
                addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId === 0)
                props.createDJogador(values, onSuccess)
            else
                props.updateDJogador(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.dJogadorList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit} id="frmJogador">
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="nome"
                        variant="outlined"
                        label="Nome do Jogador"
                        value={values.nome}
                        onChange={handleInputChange}
                        {...(errors.nome && { error: true, helperText: errors.nome })}
                    />
                   
                    <FormControl variant="outlined"
                        className={classes.formControl}
                        {...(errors.equipeId && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Time</InputLabel>
                        <Select
                            name="equipeId"
                            value={values.equipeId}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="">Escolha um time</MenuItem>
                            
                            {
                                    props.dTimeList.map((record, index) => {
                                        return (
                                           <MenuItem key={index}  value={record.id}>{record.nome}</MenuItem>
                                            )
                                    })
                                }
                        
                           
                        </Select>
                        {errors.equipeId && <FormHelperText>{errors.equipeId}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>

                    
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    dJogadorList: state.dJogador.list,
    dTimeList: state.dTime.list
})

const mapActionToProps = {
    createDJogador: actions.create,
    updateDJogador: actions.update,
    fetchAllDTimes: actionsTime.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DJogadorForm));