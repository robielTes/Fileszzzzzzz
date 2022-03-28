using NUnit.Framework;
using _226BTDDFileszzz;
using System.IO;

namespace TestFileszzzzz
{
    public class TestFileHelper
    {
        /// <summary>
        /// This test class is designed to test the FileHelper class
        /// author : nicolas.glassey
        /// version: 21-JAN-2022
        /// </summary>
        #region private attributs
        private FileHelper fileHelper;
        private static string path = Directory.GetCurrentDirectory();
        private static string fileName = "testFile.csv";
        #endregion private attributs

        /// <summary>
        /// This test method prepares the context for all tests methods
        /// </summary>
        [SetUp]
        public void Setup()
        {
            if (File.Exists(path + "//" + fileName))
            {
                File.Delete(path + "//" + fileName);
            }
            StreamWriter streamWriter = new StreamWriter(path + "//" + fileName);
            streamWriter.Close();
        }

        /// <summary>
        /// This test validates the constructor's behavior.
        /// Test case : try to open an inexisting file
        /// </summary>
        [Test]
        public void Constructor_InexistingFile_ThrowException()
        {
            //given
            string wrongPath = "falkjalj";
            string wrongFileName = "wrong.csv";

            //when
            Assert.Throws<FileNotFoundException>(delegate
            {
                this.fileHelper = new FileHelper(wrongPath, wrongFileName);
            });

            //then
            //exception thrown
        }

        /// <summary>
        /// This test validates the constructor's behavior.
        /// Test case : File is empty.
        /// </summary>
        [Test]
        public void Constructor_FileEmpty_ThrowException()
        {
            //given
            //refer to Init() method
            this.fileHelper = new FileHelper(path, fileName);

            //when
            Assert.Throws<EmptyFileException>(delegate
            {
                this.fileHelper.ExtractFileContent();
            });

            //then
            //exception thrown
        }

        /// <summary>
        /// This test validates the extract method, via the lines accessors.
        /// </summary>
        [Test]
        public void Constructor_NominalCase_Success()
        {
            //given
            //refer to Init() method
            int expectedAmountOfLines = 20;
            int actualAmountOfLines = 0;
            StreamWriter streamWriter = new StreamWriter(path + "//" + fileName);
            for (int i = 0; i < expectedAmountOfLines; i++)
            {
                streamWriter.WriteLine(i);
            }
            streamWriter.Close();
            this.fileHelper = new FileHelper(path, fileName);
            this.fileHelper.ExtractFileContent();

            //when
            actualAmountOfLines = this.fileHelper.Lines.Count;

            //then
            Assert.AreEqual(expectedAmountOfLines, actualAmountOfLines);
        }

        /// <summary>
        /// This test validates the Split method's behavior.
        /// Test case : One big file (400 lines) splitted in two files (200 lines each)
        /// </summary>
        [Test]
        public void Split_OnlyOneBigFile_Success()
        {
            //given
            //refer to Init() 
            int amountOfLinesInOriginalFile = 400;
            int expectedAmountOfResultFiles = 2;
            int expectedLinesPerFiles = amountOfLinesInOriginalFile / expectedAmountOfResultFiles;
            StreamWriter streamWriter = new StreamWriter(path + "//" + fileName);
            for (int i = 1; i <= amountOfLinesInOriginalFile; i++)
            {
                streamWriter.WriteLine(i);
            }
            streamWriter.Close();

            this.fileHelper = new FileHelper(path, fileName);
            this.fileHelper.ExtractFileContent();

            //when
            this.fileHelper.Split(expectedLinesPerFiles);
            string[] listOfFilesResult = Directory.GetFiles(path, "Split*.csv");

            //then
            Assert.AreEqual(expectedAmountOfResultFiles, listOfFilesResult.Length);
        }

        /// <summary>
        /// This test method cleans the context for the next test method
        /// </summary>
        [TearDown]
        public void TearDown()
        {
            string[] listOfFilesResult = Directory.GetFiles(path, "*.csv");
            foreach (string file in listOfFilesResult)
            {
                File.Delete(file);
            }
        }
    }
}
