import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dJogador";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import DJogadorForm from "./DJogadorForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";



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

const DJogadores = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllDJogadores()
    }, [])//componentDidMount
    
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDJogador(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={3} >
            <h2>Jogadores</h2>
            <Grid container>
                <Grid item xs={6}>
                    <DJogadorForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                <TableCell>ID</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Time</TableCell>
                                    
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody id="asdas">
                                {
                                    props.dJogadorList.map((records, index) => {
                                        return (<TableRow key={index} hover>
                                             <TableCell>{records.id}</TableCell>
                                            <TableCell>{records.nome}</TableCell>
                                            <TableCell>{records.equipeId}</TableCell>
                                            
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(records.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(records.id)} /></Button>
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
    dJogadorList: state.dJogador.list
})

const mapActionToProps = {
    fetchAllDJogadores: actions.fetchAll,
    deleteDJogador: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DJogadores));