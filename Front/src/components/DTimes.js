import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dTime";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import DTimeForm from "./DTimeForm";
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

const DTimes = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllDTimes()
    }, [])//componentDidMount
    
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDTime(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
    }

   
    return (
        <Paper className={classes.paper} elevation={3} id="pTime">
            <h2>Equipes</h2>
            <Grid container>
                <Grid item xs={6}>
                <DTimeForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow><TableCell>ID</TableCell>
                                    
                                    <TableCell>Times</TableCell>
                                    <TableCell></TableCell> 
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dTimeList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                             <TableCell>{record.id}</TableCell>
                                            <TableCell>{record.nome}</TableCell>
                                           
                                          
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                                                                      
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
    dTimeList: state.dTime.list
})

const mapActionToProps = {
    fetchAllDTimes: actions.fetchAll,
    deleteDTime: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DTimes));