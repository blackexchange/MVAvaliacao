import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dPartida";

import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import DPartidaForm from "./DPartidaForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import {PanTool,SportsKabaddi } from "@material-ui/icons/";



const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const DPartidas = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllDPartidas()
    }, [])//componentDidMount
    
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDPartida(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
    }

    const onPontoA = id => {
            setCurrentId(id);
            var timeA = props.dPartidaList.placarA;
            props.updatePartida(id,()=>addToast("Ponto para time A", { appearance: 'info' }))
    }
    const onPontoB = id => {
      
            props.updatePartida(id,()=>addToast("Ponto para time B", { appearance: 'info' }))
    }

    const onFinalizar = id => {
        setCurrentId(id);
        var timeA = props.dPartidaList.placarA;
        var timeB = props.dPartidaList.placarB;
        window.confirm(DPartidas.onPontoA);
        /*
        if (timeA > timeB)
            window.confirm('Time A é o Vencedor!')
        else if (timeA < timeB)
            window.confirm('Time B é o Vencedor!')
        else
            window.confirm('EMPATE!')
          //  props.updatePartida(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
          */
    }
    return (
        <Paper className={classes.paper} elevation={3} id="dPartidas">
            <h2>Torneios</h2>
            <Grid container>
                <Grid item xs={6}>
                    <DPartidaForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    
                                    <TableCell>Time A</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>X</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>Time B</TableCell>
                                    <TableCell colSpan="5"></TableCell>
                                
                                   
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dPartidaList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            
                                            <TableCell>{record.equipeAId}</TableCell>
                                            <TableCell>{record.placarA}</TableCell>
                                            <TableCell>X</TableCell>
                                             <TableCell>{record.placarB}</TableCell>
                                            <TableCell>{record.equipeBId}</TableCell>
                                          
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                    <Button><SportsKabaddi
                                                        onClick={() => onPontoA(record.id)} /></Button>
                                                    <Button><PanTool color="secondary"
                                                        onClick={() => onFinalizar(record.id)} /></Button>
                                                     <Button><SportsKabaddi  color="primary"
                                                        onClick={() => onPontoB(record.id)} /></Button>                                                    
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    dPartidaList: state.dPartida.list
})

const mapActionToProps = {
    fetchAllDPartidas: actions.fetchAll,
   
    deleteDPartida: actions.Delete,
    updatePartida: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DPartidas));