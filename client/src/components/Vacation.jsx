import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import {
  vacationsPutFollow,
  vacationsDelete,
} from "../redux/vacation/vacationActions";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Vacation({ vac, setModal }) {
  const { isAdmin, id } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <>
      <Card className={classes.root + " vacation-frame"}>
        <Typography gutterBottom variant="h6" component="h2">
          {vac.location}
        </Typography>

        <Badge color="secondary" badgeContent={vac.followers}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={vac.image}
              title={vac.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                {vac.title}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                color="textSecondary"
                component="p"
                className="vacation-body"
              >
                {vac.description}
              </Typography>

              <Typography gutterBottom variant="body1">
                {new Date(vac.dateFrom).toLocaleDateString()} -{" "}
                {new Date(vac.dateTo).toLocaleDateString()}
              </Typography>

              <Typography variant="h5">{vac.price}$</Typography>
            </CardContent>
          </CardActionArea>
        </Badge>
        <CardActions className="vacation-action">
          {isAdmin ? (
            <>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={() => setModal({ vacationData: vac, open: true })}
              >
                EDIT
              </Button>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => dispatch(vacationsDelete(vac.id))}
              >
                DELETE
              </Button>
            </>
          ) : vac.followed ? (
            <Button
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => dispatch(vacationsPutFollow(id, vac.id, false))}
            >
              following
            </Button>
          ) : (
            <Button
              size="small"
              variant="contained"
              color="default"
              onClick={() => dispatch(vacationsPutFollow(id, vac.id, true))}
            >
              follow
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
}
