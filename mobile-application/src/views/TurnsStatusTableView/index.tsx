import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
import { AppView, Cards, ConditionalContainer } from '../../common/components';
import useTurnsStatusTable from '../../hooks/useTurnsStatusTable';
import { TRANSLATION_CHOOSE_CATEGORY_MESSAGE_KEY, TRANSLATION_WAIT_MESSAGE_KEY } from '../../common/translations/translation-keys';


/**
 * TurnsStatusTableViewProps defines the props for the Component.
 */
interface TurnsStatusTableViewProps {}

/**
 * A component that represents the view to display the turns status table
 *
 * @param {TurnsStatusTableViewProps} props - The props for the component.
 */
const TurnsStatusTableView: React.FC<TurnsStatusTableViewProps> = (props: TurnsStatusTableViewProps) => {
  const {
    loading,
    data,
    error,
  } = useTurnsStatusTable();
  const { t } = useTranslation();
  const messageKey = loading ? TRANSLATION_WAIT_MESSAGE_KEY : "";
  return (
    <AppView
      loading={loading}
      error={error}
    >
      <ConditionalContainer display={!loading && !!data}>
        <View style={styles.content}>
          <DataTable style={styles.beingAttended}>
            <DataTable.Header style={styles.header}>
              <DataTable.Title textStyle={styles.title}>Turno</DataTable.Title>
              <DataTable.Title textStyle={styles.title}>Posición</DataTable.Title>
            </DataTable.Header>

            {data?.items?.filter(item => item.statusCode === "BEING_ATTENDED").map((item) => (
              <DataTable.Row key={item.ticketNumber}>
                <DataTable.Cell textStyle={styles.cell}>{item.ticketNumber}</DataTable.Cell>
                <DataTable.Cell textStyle={styles.cell}>{item.queueName}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          <DataTable style={styles.toBeAttended}>
            <DataTable.Header style={styles.header}>
              <DataTable.Title textStyle={styles.title}>Próximos Turnos</DataTable.Title>
            </DataTable.Header>

            {data?.items?.filter(item => item.statusCode === "TO_BE_ATTENDED").map((item) => (
              <DataTable.Row key={item.ticketNumber}>
                <DataTable.Cell textStyle={styles.cell}>{item.ticketNumber} a {item.queueName}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ConditionalContainer>
    </AppView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#b4c5e4',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: '#000',
  },
  cell: {
    fontSize: 18,
    fontWeight: 600,
    color: '#000',
  },
  content: {
    width: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 50
  },
  beingAttended: {
    width: '60%',
    backgroundColor: '#fff',
  },
  toBeAttended: {
    width: '30%',
    backgroundColor: '#fff',
  },
});

export default TurnsStatusTableView;