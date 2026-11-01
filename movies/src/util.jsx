import truncate from "lodash/truncate";
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

export function excerpt(string) {
  return truncate(string, {    
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

export function getChipSections(media, mediaType){
  switch(mediaType){
    case "movie":
      return[
        {
          id: "genres",
          title: "Genres",
          icon: TheaterComedyIcon,
          values: media.genres.map((genre) => ({
            id: genre.id,
            label: genre.name
          }))
        },
        {
          id: "details",
          title: "Details",
          icon: InfoIcon,
          values: [
            {
              id: "revenue",
              label: media.revenue.toLocaleString(),
              icon: MonetizationOnIcon
            },
            {
              id: "voteAverage",
              label: media.vote_average,
              value: `(${media.vote_count})`,
              icon: StarRateIcon
            },
            {
              id: "runtime",
              label: media.runtime,
              value: " mins",
              icon: AccessTimeIcon
            },
            {
              id: "released",
              label: "Released:",
              value: media.release_date,
              icon: EventIcon
            }
          ]
        },
        {
          id: "productionCompanies",
          title: "Production Companies",
          icon: BusinessIcon,
          values: media.production_companies.map((company) => ({
            id: company.id,
            label: company.name
          }))
        }
      ]
    case "tv":
      return [
        {
          id: "genres",
          title: "Genres",
          icon: TheaterComedyIcon,
          values: media.genres.map((genre) => ({
            id: genre.id,
            label: genre.name
          }))
        },
        {
          id: "details",
          title: "Details",
          icon: InfoIcon,
          values: [
            {
              id: "aired",
              label: "Aired:",
              value: media.first_air_date,
              icon: EventIcon
            },
            {
              id: "voteAverage",
              label: media.vote_average,
              value: `(${media.vote_count})`,
              icon: StarRateIcon
            },
            {
              title: "status",
              label: "Status:",
              value: media.status,
              icon: PodcastsIcon
            },
            {
              title: "seasons",
              label: "Seasons:",
              value: media.seasons.length,
              icon: ListIcon
            }
          ]
        },
        {
          id: "networks",
          title: "Networks",
          icon: SmartDisplayIcon,
          values: media.networks.map((network) => ({
            id: network.id,
            label: network.name
          }))
        }
      ];
    default: return null;
  }
}