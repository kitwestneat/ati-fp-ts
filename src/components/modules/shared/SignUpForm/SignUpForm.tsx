// @flow

import React, { PureComponent } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Text } from '../../../primitives';

import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

import { subscribe } from './subscribe';

import { ASYNC_STATES } from '@/constants';
import EmailInput from './EmailInput';
import SubmitButton from './SubmitButton';

const COPY_DEFAULT = {
  SUCCESS: 'Thank you for subscribing to our newsletter!',
  ERROR: 'There was an error subscribing to the newsletter. Please try again later.'
};

interface Props {
  subscribeExtraOpts?: any;
}

interface State {
  submissionStatus: ASYNC_STATES;
  email: string;
}

class SignUpForm extends PureComponent<Props, State> {
  public state: State = {
    email: '',
    submissionStatus: ASYNC_STATES.DEFAULT
  };

  public setEmail = (email: string) => this.setState({ email });

  public handleSubmit = async () => {
    const { email } = this.state;
    if (!email) {
      return;
    }

    this.setState({ submissionStatus: ASYNC_STATES.LOADING });

    const { subscribeExtraOpts } = this.props;
    const { status } = await subscribe(email, subscribeExtraOpts);

    this.setState({
      submissionStatus: status === 200 ? ASYNC_STATES.SUCCESS : ASYNC_STATES.ERROR
    });
  };

  public renderLoading = () => <ActivityIndicator size="large" color="white" />;

  public renderSuccess = () => (
    <Text style={[styles.successMsg]}>
      <FaCheckCircle />
      {COPY_DEFAULT.SUCCESS}
    </Text>
  );

  public renderError = () => (
    <Text style={[styles.errorMsg]}>
      <FaExclamationTriangle />
      {COPY_DEFAULT.ERROR}
    </Text>
  );

  public renderForm = () => {
    const { email } = this.state;

    return (
      <View>
        {this.props.children}
        <View style={styles.signupWrap}>
          <EmailInput value={email} onChangeText={this.setEmail} onSubmit={this.handleSubmit} />
          <SubmitButton onPress={this.handleSubmit} />
        </View>
      </View>
    );
  };

  public renderBySubmissionStatus = (submissionStatus: ASYNC_STATES) => {
    const MAP = {
      [ASYNC_STATES.DEFAULT]: this.renderForm(),
      [ASYNC_STATES.LOADING]: this.renderLoading(),
      [ASYNC_STATES.SUCCESS]: this.renderSuccess(),
      [ASYNC_STATES.ERROR]: this.renderError()
    };
    return MAP[submissionStatus];
  };

  public render() {
    const { submissionStatus } = this.state;

    return this.renderBySubmissionStatus(submissionStatus);
  }
}

export default SignUpForm;

const styles = StyleSheet.create({
  signupWrap: {
    marginTop: 20,
    position: 'relative'
  },
  errorMsg: {
    color: 'white',
    fontSize: 30,
    lineHeight: 40,
    fontWeight: '600'
  },
  successMsg: {
    color: 'white',
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '300'
  }
});
