
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState} from "react";
import { InputBase } from "@mui/material";


export default function SearchBox(props) {
    const [search, setSearch] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        props.onSearch(search);
        //console.log("Search term from SearchBox:", search);
    }
    /* https://mui.com/material-ui/react-text-field/#CustomizedInputBase.js */
    return (
        <> 
            <Paper component="form" elevation={12} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}} onSubmit={onSubmit} noValidate>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search for a movie"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </>
    );
};