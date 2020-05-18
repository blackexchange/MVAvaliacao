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
            props.dPartidaList[0].onPontoA=20;
           
            //var timeA = props.dPartidaList.placarA;
            props.updatePartida(id,()=>addToast("Ponto para time 1", { appearance: 'info' }))
    }
    const onPontoB = id => {
        setCurrentId(id);
      
          //  props.updatePartida(id,()=>addToast("Ponto para time 2", { appearance: 'info' }))
    }

    const onFinalizar = id => {
        setCurrentId(id);


       
        var timeA = parseInt(props.dPartidaList[0].placarA);
        var timeB = parseInt(props.dPartidaList[0].placarB);

        
   
        if (timeA > timeB)
            addToast("O Time 1 é o vencedor!", { appearance: 'success' });
        else if (timeA < timeB)
            addToast("O Time 2 é o vencedor!", { appearance: 'warning' });
        else
            addToast("Deu Empate!!", { appearance: 'info' });
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
                                    
                                    <TableCell>ID Time 1</TableCell>
                                    <TableCell>Placar</TableCell>
                                    <TableCell>X</TableCell>
                                    <TableCell>Placar</TableCell>
                                    <TableCell>ID Time 2</TableCell>
                                    <TableCell colSpan="2"></TableCell>
                                
                                   
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
                                                    
                                                    <Button><PanTool color="secondary"
                                                    titleAccess="Finalizar"
                                                        onClick={() => onFinalizar(record.id)} /></Button>
                                                                                                    
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