import React from "react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@material-ui/core";

export default function Page404({ text = "Page Not found." }) {
  return (
    <div className="user-frame">
      <Card className="card-frame">
        <CardContent>
          <h1 style={{ color: "#555" }}>{text}</h1>

          <br />
          <span>Return? </span>
          <Link to="/login">home</Link>
        </CardContent>
      </Card>
    </div>
  );
}
