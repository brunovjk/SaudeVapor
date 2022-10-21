import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './common';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
    Home as HomeView,
    About as AboutView,
    Search as SearchView,
    Post as PostView,
    Token as TokenView,
    Terms as TermsView,
    Contact as ContactView,
    NFTCollection as NFTCollectionView,
    NotFound as NotFoundView,
} from './views';

const Routes = () => {
    return (
        <Switch>
            <Redirect exact from="/home" to="/" />
            <RouteWithLayout component={HomeView} exact layout={MainLayout} path="/" />
            <RouteWithLayout component={AboutView} exact layout={MainLayout} path="/about" />
            <RouteWithLayout component={SearchView} exact layout={MainLayout} path="/search" />
            <RouteWithLayout component={PostView} exact layout={MainLayout} path="/post/:postId" />
            <RouteWithLayout component={TokenView} exact layout={MainLayout} path="/token/:tokenId" />
            <RouteWithLayout component={TermsView} exact layout={MainLayout} path="/terms" />
            <RouteWithLayout component={ContactView} exact layout={MainLayout} path="/contact" />
            <RouteWithLayout component={NFTCollectionView} exact layout={MainLayout} path="/nft-collection" />
            <RouteWithLayout component={NotFoundView} exact layout={MinimalLayout} path="/not-found" />
            <Redirect to="/not-found" status="404" />
        </Switch>
    );
};

export default Routes;
