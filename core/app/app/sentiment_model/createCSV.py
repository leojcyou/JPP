import csv

def read_text_file(filename):
    with open(filename, 'r') as file:
        lines = file.readlines()
    return lines

def write_to_csv(data, csv_filename):
    with open(csv_filename, 'w', newline='', encoding='utf-8') as csv_file:
        csv_writer = csv.writer(csv_file)
        for line in data:
            csv_writer.writerow([line.strip()])

def main():
    test_data = read_text_file('data/test.txt')
    train_data = read_text_file('data/train.txt')
    val_data = read_text_file('data/val.txt')
    
    write_to_csv(test_data, 'test.csv')
    write_to_csv(train_data, 'train.csv')
    write_to_csv(val_data, 'val.csv')

if __name__ == "__main__":
    main()
