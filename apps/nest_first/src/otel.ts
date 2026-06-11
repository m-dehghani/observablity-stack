import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

const otelEndpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://otel-collector:4317';

const traceExporter = new OTLPTraceExporter({ url: otelEndpoint, credentials: undefined });

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start()
  .then(() => {
    // SDK started
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Error starting OpenTelemetry SDK', err);
  });

process.on('SIGTERM', () => {
  sdk.shutdown().catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Error shutting down OpenTelemetry SDK', err);
  });
});
