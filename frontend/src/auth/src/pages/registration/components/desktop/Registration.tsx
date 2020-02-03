import React from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import { Column, Layout, Row } from 'ui/layout';
import { Text } from 'ui/text';
import { Input } from 'ui/input';
import { Button } from 'ui/button';
import { RouteLink } from 'ui/link';
import messages from '../../messages';

interface Props {
  confirmPassword: string;
  email: string;
  errors: any;
  intl: InjectedIntl;
  password: string;
  onChangeConfirmPassword: () => void;
  onChangeEmail: () => void;
  onChangePassword: () => void;
  onRegister: () => void;
}

const Registration = ({
  confirmPassword,
  email,
  errors,
  intl,
  password,
  onChangeConfirmPassword,
  onChangeEmail,
  onChangePassword,
  onRegister
}: Props) => {
  const { email: emailError, password: passwordError } = errors;

  return (
    <Column align="center">
      <Layout basis={60} />
      <Text size="2xl" height="xs" weight="bold">
        {intl.formatMessage(messages.registration)}
      </Text>
      <Layout basis={40} />
      <Row justify="center">
        <Layout basis={360}>
          <Text size="s" weight="bold" transform="uppercase">
            {intl.formatMessage(messages.mail)}
          </Text>
        </Layout>
      </Row>
      <Layout basis={12} />
      <Row justify="center">
        <Layout basis={360}>
          <Input
            type="email"
            borderColor="lightGray"
            error={!!emailError}
            value={email}
            onChange={onChangeEmail}
            placeholder={intl.formatMessage(messages.enterEmail)}
            errorTitle={emailError}
          />
        </Layout>
      </Row>
      <Row justify="center">
        <Layout basis={360}>
          <Text size="s" weight="bold" transform="uppercase">
            {intl.formatMessage(messages.password)}
          </Text>
        </Layout>
      </Row>
      <Layout basis={12} />
      <Row justify="center">
        <Layout basis={360}>
          <Input
            type="password"
            borderColor="lightGray"
            error={!!passwordError}
            value={password}
            onEnter={onRegister}
            onChange={onChangePassword}
            placeholder={intl.formatMessage(messages.enterPassword)}
            errorTitle={passwordError}
          />
        </Layout>
      </Row>
      <Row justify="center">
        <Layout basis={360}>
          <Input
            type="password"
            borderColor="lightGray"
            error={password !== confirmPassword}
            value={confirmPassword}
            onEnter={onRegister}
            onChange={onChangeConfirmPassword}
            placeholder={intl.formatMessage(messages.repeatPassword)}
          />
        </Layout>
      </Row>
      <Layout basis={24} />
      <Row justify="center">
        <Layout basis={360}>
          <Button
            text
            disabled={!email || !password || password !== confirmPassword}
            onClick={onRegister}
          >
            {intl.formatMessage(messages.register)}
          </Button>
        </Layout>
      </Row>
      <Layout basis={16} />
      <RouteLink
        to="/auth"
        size="s"
        height="xs"
        weight="medium"
        color="black"
        hoverColor="blueBayoux"
      >
        {intl.formatMessage(messages.login)}
      </RouteLink>
    </Column>
  );
};

export default injectIntl(Registration);
