// @flow

import React, { PureComponent } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { Text } from '../../../primitives';

import { subscribe } from './subscribe';

import EmailInput from './EmailInput';
import SubmitButton from './SubmitButton';
import { ASYNC_STATES } from '@/constants';

const COPY_DEFAULT = {
  SUCCESS: 'Thank you for subscribing to our newsletter!',
  ERROR: 'There was an error subscribing to the newsletter. Please try again later.',
};

interface Props {
  newsletter: 'HU' | 'ATI' | 'both';
  moreStyles?: any;
}

interface State {
  submissionStatus: ASYNC_STATES;
  email: string;
}

class SignUpForm extends PureComponent<Props, State> {
  public state: State = {
    email: '',
    submissionStatus: ASYNC_STATES.DEFAULT,
  };

  public setEmail = (email: string) => this.setState({ email });

  public handleSubmit = async () => {
    const { email } = this.state;
    if (!email) {
      return;
    }

    this.setState({ submissionStatus: ASYNC_STATES.LOADING });

    const { newsletter } = this.props;
    const { status } = await subscribe(email, { type: newsletter });

    this.setState({
      submissionStatus: status == 200 ? ASYNC_STATES.SUCCESS : ASYNC_STATES.ERROR,
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
    const { moreStyles } = this.props;

    return (
      <View>
        {this.props.children}
        <View style={[styles.signupWrap, moreStyles]}>
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
      [ASYNC_STATES.ERROR]: this.renderError(),
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
    position: 'relative',
  },
  errorMsg: {
    color: 'white',
    fontSize: 30,
    lineHeight: 40,
    fontWeight: '600',
  },
  successMsg: {
    color: 'white',
    fontSize: 24,
    lineHeight: 31,
    fontWeight: '300',
  },
});
