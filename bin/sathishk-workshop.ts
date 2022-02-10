#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { SathishkWorkshopStack } from '../lib/sathishk-workshop-stack';

const app = new cdk.App();
new SathishkWorkshopStack(app, 'SathishkWorkshopStack');
