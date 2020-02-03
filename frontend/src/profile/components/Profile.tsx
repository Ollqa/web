import React, { FC } from 'react';
import { injectIntl, InjectedIntl } from 'react-intl';
import { Column, Layout, Row } from 'ui/layout/src';
import { Text } from 'ui/text';
import { Input } from 'ui/input';
import { Button } from 'ui/button';
import { RouteLink } from 'ui/link';
import messages from '../messages';

interface Props {
  intl: InjectedIntl;
  firstName: string;
  errors: any;
  lastName: string;
  onChangeLastName: (value: string) => void;
  onChangeFirstName: (value: string) => void;
  onSave: Function;
}

const Profile: FC<Props> = ({
  errors = {},
  intl,
  firstName,
  lastName,
  onChangeLastName,
  onChangeFirstName,
  onSave
}) => (
    <Column align="center">
      <Layout basis={60} />
      <Text weight="medium" size="l">
        {intl.formatMessage(messages.title)}
      </Text>
      <Layout basis={40} />
      <Row justify="center">
        <Layout basis={360}>
          <Text size="s" weight="bold" transform="uppercase">
            {intl.formatMessage(messages.firstName)}
          </Text>
        </Layout>
      </Row>
      <Layout basis={12} />
      <Row justify="center">
        <Layout basis={360}>
          <Input
            border="lightGray"
            error={!!errors.firstName || !!errors.id}
            errorTitle={errors.firstName || errors.id}
            value={firstName}
            onChange={onChangeFirstName}
            placeholder={intl.formatMessage(messages.enterFirstName)}
          />
        </Layout>
      </Row>
      <Layout basis={12} />
      <Row justify="center">
        <Layout basis={360}>
          <Text size="s" weight="bold" transform="uppercase">
            {intl.formatMessage(messages.lastName)}
          </Text>
        </Layout>
      </Row>
      <Layout basis={12} />
      <Row justify="center">
        <Layout basis={360}>
          <Input
            border="lightGray"
            error={!!errors.lastName}
            errorTitle={errors.lastName}
            value={lastName}
            onChange={onChangeLastName}
            placeholder={intl.formatMessage(messages.enterLastName)}
          />
        </Layout>
      </Row>

      <Layout basis={24} />
      <Row justify="center">
        <Layout basis={360}>
          <Button text disabled={!lastName && !firstName} onClick={onSave}>
            {intl.formatMessage(messages.save)}
          </Button>
        </Layout>
      </Row>
      <Layout basis={16} />
      <RouteLink
        to="/"
        size="s"
        height="xs"
        weight="medium"
        color="black"
        hoverColor="blueBayoux"
      >
        {intl.formatMessage(messages.back)}
      </RouteLink>
    </Column>
  );

export default injectIntl(Profile);
