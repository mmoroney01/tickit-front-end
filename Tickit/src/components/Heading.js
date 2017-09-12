import React, { Component } from 'react';

import { StyleSheet, Text } from 'react-native';

const Heading = props => {
    return (
        <Text style={props.styles && props.styles.textLabel ? props.styles.textLabel : styles.textLabel}>
            {props.text}
        </Text>
    );
};

const styles = StyleSheet.create({
    textLabel: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Verdana',
        marginBottom: 100,
        color: '#595856'
    }
});

export default Heading;
