import React, { useState, useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dTime";
import { useToasts } from "react-toast-notifications";

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
    nome: ''
}

const DTimeForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

  
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('nome' in fieldValues)
            temp.nome = fieldValues.nome ? "" : "This field is required."
      
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
    

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("Salvo", { appearance: 'success' })
            }
            if (props.currentId === 0)
                props.createDTime(values, onSuccess)
            else
                props.updateDTime(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.dTimeList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit} id="frmTime">
            <Grid container>
                
                <Grid item xs={6}>
                    <TextField
                        name="nome"
                        variant="outlined"
                        label="Time"
                        value={values.nome}
                        onChange={handleInputChange}
                        {...(errors.nome && { error: true, helperText: errors.nome })}
                    />
                    
                </Grid>
                <Grid item xs={6}>

                    
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Salvar
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Limpar
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    dTimeList: state.dTime.list
})

const mapActionToProps = {
    createDTime: actions.create,
    updateDTime: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DTimeForm));