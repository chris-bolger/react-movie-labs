import { Stack, Paper, Chip } from "@mui/material";
import { getChipSections } from "../../util";
import StarRateIcon from "@mui/icons-material/StarRate";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import InfoIcon from "@mui/icons-material/Info";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import BusinessIcon from "@mui/icons-material/Business";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import ListIcon from "@mui/icons-material/List";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";

const chipSx = { margin: 0.5 };
const paper = {padding : 0.2, margin : 0.5, justifyContent: 1};
export default function MediaDetailsChips({media, mediaType}) {
    const data = getChipSections(media, mediaType);
    //console.log("Data: ", data);
    return (
        <>
            <Stack direction="row" spacing={1} sx={{ my: 1, spacing: 1, justifyContent: "space-between" }}>
                {data.map((section) => {
                    const SectionIcon = section.icon;
                    return (
                        <Paper sx={{...paper}}>
                            <Chip key={section.id} label={section.title} icon={SectionIcon ? <SectionIcon /> : undefined} sx={{...chipSx}} color="primary"/>
                            {section.values.map((chip) => {
                                const ChipIcon = chip.icon;
                                return (
                                    <Chip key={chip.id} label={`${chip.label} ${chip.value ?? ""}`} icon={ChipIcon ? <ChipIcon /> : undefined} sx={{...chipSx}}/>
                                );
                            })}
                        </Paper>
                    );
                })}
            </Stack>
        </>
    )
};