**Basic Example**

```jsx
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import theme from "../../../theme";

<ThemeProvider theme={theme}>
  <CardArticle>
    <Typography variant="h6">This is basic card</Typography>
  </CardArticle>
</ThemeProvider>;
```

**Custom Shadow Example**

```jsx
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import theme from "../../../theme";

<ThemeProvider theme={theme}>
  <CardArticle withShadow>
    <Typography variant="h6">This is basic card with custom shadows</Typography>
  </CardArticle>
</ThemeProvider>;
```

**LiftUp Effect Example**

```jsx
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import theme from "../../../theme";

<ThemeProvider theme={theme}>
  <CardArticle withShadow liftUp>
    <Typography variant="h6">
      This is basic card will lift up on hover
    </Typography>
  </CardArticle>
</ThemeProvider>;
```

**Basic Card with No Border and No Shadow Example**

```jsx
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import theme from "../../../theme";

<ThemeProvider theme={theme}>
  <CardArticle noBorder noShadow>
    <Typography variant="h6">
      This is basic card without border and without shadow
    </Typography>
  </CardArticle>
</ThemeProvider>;
```

**Basic Card with Outlined Effect**

```jsx
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import theme from "../../../theme";

<ThemeProvider theme={theme}>
  <CardArticle variant="outlined">
    <Typography variant="h6">
      This is basic card with outlined effect
    </Typography>
  </CardArticle>
</ThemeProvider>;
```
